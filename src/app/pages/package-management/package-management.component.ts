import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css']
})
export class PackageManagementComponent implements OnInit {
  pageNo: number = 1;
  searchkey: any;
  user: any;
  paginationData: any;
  srNo: any;
  id: any;
  editForm: any;
  packagedata: any;
  userList: any;
  userType: any;


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public service: MainServicesService) {
    this.editForm = new FormGroup({
      //'name':new FormControl('',[Validators.required]),
      //'email':new FormControl('',[Validators.required]),
      'packageName': new FormControl('', Validators.compose([Validators.required])),
      'coins': new FormControl('', ([Validators.required, Validators.maxLength(64)])),
      //'mobile':new FormControl('',[Validators.required]),
      'price': new FormControl('', Validators.compose([Validators.required])),
    })
  }

  ngOnInit() {
    this.userType = JSON.parse(localStorage.getItem('type'))

    this.search(this.pageNo)
    // this.getId();
    // this.search1()
  }

  search(page) {
    console.log(page)

    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
    }

    this.service.postApi(`transaction/getPackage`, postData, 1).subscribe(response => {
      console.log("to check userlist", JSON.stringify(response))
      if (response['responseCode'] == 200) {
        this.user = response;
        this.userList = this.user.result
        console.log("=>>>>>>>..gfgffghfgh", this.user)
        this.paginationData = response['paginationData']
        this.srNo = (this.pageNo - 1) * this.paginationData.limit
        console.log("check sl no>>>>", this.paginationData, this.srNo, this.pageNo, this.paginationData.limit)
      }
      else {

        this.service.toastErr(response['responseMessage'])


      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')

    })
  }

  // edit(id){
  //   console.log("edit Id>>>>",id)
  //   this.router.navigate(['package-management/'+id])
  // }



  logoutFunc() {
    $('#logout_modal').modal('hide');
    this.router.navigateByUrl('/login')
  }

  // getId(){
  //   this.activatedRoute.params.subscribe(params => {
  //     this.id = params.id
  //     console.log('param is edit  ==>>', this.id);
  //   })
  // }

  // search1() {
  //   let postData = {
  //     helpCenterId : this.id,
  //   }

  //   this.service.postApi(`transaction/getPackage`, postData, 1).subscribe(response => {
  //     console.log("to check userDetails", response)
  //     if (response['responseCode'] == 200) {
  //       this.user = response['result'];
  //       this.editForm.patchValue({
  //         'packageName':this.user[0].packageName,
  //         'coins':this.user[0].coins,
  //         'price':this.user[0].price ,

  //       })
  //       console.log("to check userDetails", this.user)
  //     }

  //   })
  // }

  update() {

    console.log("in updated form Data >>>>", this.id, this.editForm.value)

    let postData = {
      packageId: this.packagedata._id,
      packageName: this.editForm.value.packageName,
      coins: this.editForm.value.coins,
      currencyType: this.editForm.value.currencyType,
      price: this.editForm.value.price,
    }
    console.log("+++++++++", postData)
    this.service.postApi(`transaction/editPackage`, postData, 1).subscribe(response => {
      if (response["responseCode"] == 200) {
        this.search(this.pageNo)
        console.log("updated Data=====", response)
        this.service.showSuccess(response['responseMessage'])
        this.router.navigate(['package-management'])
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      this.service.toastErr('Something Went Wrong')

    })

  }

  editModalFunc(data) {
    this.packagedata = data
    console.log('data ===>>>>', data)
    this.editForm.patchValue({
      'packageName': data.packageName,
      'coins': data.coins,
      'price': data.price
    })

  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.userList.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Package Name": element.packageName,
        "Price": element.price,
        "Coins": element.coins
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Package Management');
  }


}
