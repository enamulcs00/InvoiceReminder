import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup } from '../../../../node_modules/@angular/forms';



declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  // userData= []

  userForm: FormGroup;
  pageNo: any = 1;
  user: any = [];
  srNo: number;
  searchkey: any = ''
  paginationData: any;
  deleteId: any;
  logger = true;
  categoryId: any;
  status: any;
  userId: any;
  data: any = [];
  userList: any;
  str: any = "All";
  userType: any;


  constructor(public router: Router, public service: MainServicesService) { }

  // constructor(public router:Router) { }

  ngOnInit() {
    this.userType = JSON.parse(localStorage.getItem('type'))
    this.search(this.pageNo)

    //this.check() 
  }


  search(page) {
    console.log(page)
    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
      userManagement: "1"
    }


    this.service.postApi(`admin/userList`, postData, 1).subscribe(response => {
      console.log("to check userlist", response)
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
      // this.service.toastErr('Something Went Wrong')

    })



  }



  view(id) {
    console.log(id)
    this.router.navigate(['manage-records/' + id]);
  }



  edit(id) {
    console.log("edit Id>>>>", id)
    this.router.navigate(['edit-user-detail/' + id])
  }


  // deleteGetId(id){
  //   console.log("delete id ==>>",id)
  //   this.deleteId= id
  // }

  deleteUserFunc(id, status) {
    this.deleteId = id;
    this.status = 'DELETE';
    $('#delete').modal('show');
    console.log('User Id===>>', this.deleteId, this.status)
  }



  deleteUser() {
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


  sliderRound(id, status) {
    console.log(id, status)
    this.userId = id;
    if (status == 'BLOCK') {
      this.status = 'ACTIVE';
      this.service.showSuccess('User has been activated successfully')
    }
    else {
      this.status = 'BLOCK';
      this.service.toastErr('User has been blocked successfully')
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

  // delete(){
  //   let postData={
  //     userId:this.deleteId
  //   }

  //     console.log("deleted Id>>>",postData)
  //     this.service.postApi('admin/actionPerform', postData, 1).subscribe(response => {
  //       if (response['responseCode'] == 200) {
  //         this.search(1)
  //       }
  //       else {
  //          this.service.showSuccess(response['responseMessage'])
  //       }
  //     }, error => {
  //       this.service.toastErr('Something Went Wrong')



  //     })

  //     $('#delete').modal('hide');

  //   }



  logoutFunc() {
    $('#logout_modal').modal('hide');
    this.router.navigateByUrl('/login')
  }

  filters() {

    this.userList = []
    console.log("inside filters ", this.str)
    if (this.str == 'ACTIVE') {
      this.user.result.forEach(element => {
        if (element.status == 'ACTIVE') {
          this.userList.push(element)
          console.log("inside filters Active ", element)
        }
      })
    } else if (this.str == "BLOCK") {
      this.user.result.forEach(element => {
        if (element.status == 'BLOCK') {
          this.userList.push(element)
          console.log("inside filters Block ", element)
        }
      })
    } else {
      this.user.result.forEach(element => {
        this.userList.push(element)
        console.log("inside filters Else ", element)
      })

    }
  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.userList.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Full Name": element.fullName,
        "Email": element.email,
        "Mobile No.": element.mobileNumber,
        "Referral Code": element.referralCode,
        "Social Type": element.socialType,
        "Status": element.status
      })
    })

    this.service.exportAsExcelFile(dataArr, 'USER MANAGEMENT ADMIN');
  }



}
