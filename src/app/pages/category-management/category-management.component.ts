import { Component, OnInit } from '@angular/core';
import { MainServicesService } from 'src/app/main-services.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';

declare var $: any;
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {


  pageNo: number = 1;
  searchkey: any;
  user: any = [];
  paginationData: any;
  srNo: number = 0;
  categoryForm: FormGroup
  categoryId: any;
  editCategoryForm: FormGroup
  userType1: any;
  userType: any;
  status: string;
  arraydata: any = [];
  categoryName: any;

  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {

    this.userType1 = JSON.parse(localStorage.getItem('type'))

    this.search(this.pageNo)
    this.buildcategoryForm()
    this.buildEditCategoryForm()
    this.editCategoryForm = new FormGroup({
      editCategoryName: new FormControl('', Validators.required)
    })
  }




  search(page) {
    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
    }

    this.service.postApi(`category/getCategory`, postData, 1).subscribe(response => {
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.arraydata = response['result']
        console.log('user=====>>>', this.user)
        this.paginationData = response['paginationData']
        this.srNo = (this.pageNo - 1) * this.paginationData.limit
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')

    })
  }
  buildcategoryForm() {
    this.categoryForm = new FormGroup({
      "categoryName": new FormControl('', ([Validators.required, Validators.maxLength(32), Validators.minLength(2), Validators.pattern((/^[a-zA-Z0-9]*$/))])),
    })
  }

  buildEditCategoryForm() {
    this.editCategoryForm = new FormGroup({
      "editCategoryName": new FormControl('', Validators.required),
    })
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      return;
    }
    let apireq = {
      categoryName: this.categoryForm.value.categoryName
    }
    this.service.postApi('category/addCategory', apireq, 1).subscribe((success: any) => {
      console.log(success)
      if (success.responseCode === 200) {
        $('#add_category').modal('hide');
        this.categoryForm.reset();
        this.search(this.pageNo);
      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  editCategoryFunc(categoryId, userType) {
    for (let i of this.user) {
      if (i._id == categoryId) {
        this.editCategoryForm.patchValue({
          editCategoryName: i.categoryName
        })
      }
    }
    this.categoryId = categoryId;
    this.userType = userType;
    $('#edit_category').modal('show');
  }

  editCategory() {
    let apireq = {
      'categoryId': this.categoryId,
      'userType': this.userType,
      'categoryName': this.editCategoryForm.value.editCategoryName
    }
    this.service.postApi('category/editCategory', apireq, 1).subscribe((success: any) => {
      console.log(success)
      if (success.responseCode === 200) {
        this.search(this.pageNo)
        $('#edit_category').modal('hide');
        this.editCategoryForm.reset();
      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  deleteCategoryFunc(categoryId, status) {
    this.categoryId = categoryId;
    this.status = 'DELETE';
    $('#delete').modal('show');
  }

  deleteCategory() {
    let apireq = {
      'categoryId': this.categoryId,
      'status': this.status
    }
    this.service.postApi('category/deleteCategory', apireq, 1).subscribe((success: any) => {
      console.log(success)
      if (success.responseCode === 200) {
        this.search(this.pageNo)
        $('#delete').modal('hide');
      }
      else {
        this.service.toastErr('Document exists')
      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  sliderRoundFunc(categoryId, status) {
    this.categoryId = categoryId;
    if (status == 'BLOCK') {
      this.status = 'ACTIVE';
      this.service.showSuccess('Category has been activated successfully')
    }
    else {
      this.status = 'BLOCK';
      this.service.toastErr('Category has been blocked successfully')
    }

    let apireq = {
      'categoryId': this.categoryId,
      'status': this.status
    }
    this.service.postApi('category/deleteCategory', apireq, 1).subscribe((success: any) => {
      if (success.responseCode === 200) {
        this.search(this.pageNo)
      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.user.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Category Name": element.categoryName,
        "Status": element.status,
      })
    })
    this.service.exportAsExcelFile(dataArr, 'Category Management');
  }



  // ..........................................upload XLSX..................  //
  onFileChange(event) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log("file type ->", file.type)
    if ((file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (file.type == 'application/vnd.ms-excel') || file.type == 'text/csv') {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        // console.log('jsonData==>>', jsonData);
        this.user = Object.values(jsonData)[0]
        this.uploadExcelFile()
      }
      reader.readAsBinaryString(file);
    } else {
      console.log('Please upload a excel sheet only.')
    }
  }

  // upload excel file
  uploadExcelFile() {
    var formData: any = new FormData();
    formData.append("csvFile", this.user);
    console.log("formData", formData)
    this.service.postApi('category/importCategory', formData, 1).subscribe(res => {
      console.log("response ==>", res);
    }, err => {
    })
  }

}


