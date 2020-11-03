import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup } from '../../../../node_modules/@angular/forms';

declare var $: any;

@Component({
  selector: 'app-subadmin-management',
  templateUrl: './subadmin-management.component.html',
  styleUrls: ['./subadmin-management.component.css']
})
export class SubadminManagementComponent implements OnInit {
  pageNo: any = 1;
  searchkey: any = ''
  user: any = [];
  paginationData: any;
  srNo: number;
  deleteId: any;
  status: string;
  userId: any;
  userList: any;
  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.search(this.pageNo)
  }

  edit(id) {
    console.log("edit Id>>>>", id)
    this.router.navigate(['edit-subadmin/' + id])
  }
  search(page) {
    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
    }

    this.service.postApi(`admin/userList`, postData, 1).subscribe(response => {
      console.log("to check userist", response)
      if (response['responseCode'] == 200) {
        this.user = response;
        this.userList = this.user.result
        this.paginationData = response['paginationData']
        this.srNo = (this.pageNo - 1) * this.paginationData.limit
        console.log("check sl no>>>>", this.paginationData, this.srNo, this.pageNo)
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      this.service.toastErr('Something Went Wrong')

    })
  }

  deleteSubAdminFunc(id, status) {
    this.deleteId = id;
    this.status = 'DELETE';
    $('#delete').modal('show');
    console.log('User Id===>>', this.deleteId, this.status)
  }

  deleteSubAdmin() {
    let apireq = {
      'userId': this.deleteId,
      'status': this.status
    }
    console.log('apireq ==>>', apireq)
    this.service.postApi('admin/actionPerform', apireq, 1).subscribe((success: any) => {
      console.log(success)
      if (success.responseCode === 200) {
        this.search(this.pageNo)
        $('#delete').modal('hide');
      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  sliderRoundFunc(id, status) {
    this.userId = id;
    if (status == 'BLOCK') {
      this.status = 'ACTIVE';
      this.service.showSuccess('Subadmin has been activated successfully')
    }
    else {
      this.status = 'BLOCK';
      this.service.toastErr('Subadmin has been blocked successfully')
    }
    // console.log('User id===>>', this.userId, this.status)

    let apireq = {
      'userId': this.userId,
      'status': this.status
    }
    // console.log('apireq ==>>', apireq)
    this.service.postApi('admin/actionPerform', apireq, 1).subscribe((success: any) => {
      // console.log(success)
      if (success.responseCode === 200) {
        this.search(this.pageNo)

      }
    }, error => {
      console.log('Something went wrong');
    })
  }

  //export User
  exportAsXLSX() {
    //console.log('click')
    let dataArr = [];
    this.userList.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Full Name": element.fullName,
        "Email": element.email,
      })
    })
    this.service.exportAsExcelFile(dataArr, 'Sub Admin Management');

  }



}
