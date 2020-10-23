import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-edit-subadmin',
  templateUrl: './edit-subadmin.component.html',
  styleUrls: ['./edit-subadmin.component.css']
})
export class EditSubadminComponent implements OnInit {
  editSubAdminForm: FormGroup;
  id: any;
  user: any;
  admId: any;
  //adminId: any;
  // permission:any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public service: MainServicesService) {

  }

  ngOnInit() {
    this.getId();
    this.search();

    this.editSubAdminForm = new FormGroup({
      //'name':new FormControl('',[Validators.required]),
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      //'password':new FormControl('',[Validators.required]),
      'password': new FormControl('', ([Validators.required, Validators.minLength(8)])),
      //'email':new FormControl('',[Validators.required]),
      'email': new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/), Validators.maxLength(64)])),
      //'confirmPassword':new FormControl('',Validators.required),
      'confirmPassword': new FormControl('', ([Validators.required, Validators.minLength(8)])),
      'dashboard': new FormControl(true),
      'userManagement': new FormControl(false),
      'subAdminManagement': new FormControl(false),
      'manageRecords': new FormControl(false),
      'categoryManagement': new FormControl(false),
      'packageManagement': new FormControl(false),
      'offerAndPromotionManagement': new FormControl(false),
      'transactionManagement': new FormControl(false),
      'helpCenterManagement': new FormControl(false),
      'staticContentManagement': new FormControl(false),
    })
  }


  getId() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
    })
    this.admId = JSON.parse(localStorage.getItem('adminInfo'));
  }

  search() {
    let postData = {
      userId: this.id,
    }

    this.service.postApi('admin/userList', postData, 1).subscribe(response => {
      console.log("to check userDetails", response)
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.editSubAdminForm.patchValue({
          'name': this.user[0].fullName,
          'email': this.user[0].email,
          'dashboard': this.user[0].permission.dashboard,
          'userManagement': this.user[0].permission.userManagement,
          'subAdminManagement': this.user[0].permission.subAdminManagement,
          'manageRecords': this.user[0].permission.manageRecords,
          'categoryManagement': this.user[0].permission.categoryManagement,
          'packageManagement': this.user[0].permission.packageManagement,
          'offerAndPromotionManagement': this.user[0].permission.offerAndPromotionManagement,
          'transactionManagement': this.user[0].permission.transactionManagement,
          'helpCenterManagement': this.user[0].permission.helpCenterManagement,
          'staticContentManagement': this.user[0].permission.staticContentManagement,
        })
      }
    })
  }

  update() {

    console.log("in updated form Data >>>>", this.editSubAdminForm.value, this.editSubAdminForm.value.fullName)


    let postData = {
      userType: "SUBADMIN",
      adminId: this.admId,
      subAdminId: this.id,
      email: this.editSubAdminForm.value.email,
      permission: {
        dashboard: this.editSubAdminForm.value.dashboard,
        userManagement: this.editSubAdminForm.value.userManagement,
        subAdminManagement: this.editSubAdminForm.value.subAdminManagement,
        manageRecords: this.editSubAdminForm.value.manageRecords,
        categoryManagement: this.editSubAdminForm.value.categoryManagement,
        packageManagement: this.editSubAdminForm.value.packageManagement,
        offerAndPromotionManagement: this.editSubAdminForm.value.offerAndPromotionManagement,
        transactionManagement: this.editSubAdminForm.value.transactionManagement,
        helpCenterManagement: this.editSubAdminForm.value.helpCenterManagement,
        staticContentManagement: this.editSubAdminForm.value.staticContentManagement,
      },


      fullName: this.editSubAdminForm.value.name,
      password: this.editSubAdminForm.value.password,
      // adminEdit:"1"
    }
    console.log(postData)
    this.service.postApi(`admin/subAdminEditProfile`, postData, 1).subscribe(response => {
      if (response["responseCode"] == 200) {
        console.log("updated Data=====", response)
        this.service.showSuccess(response['responseMessage'])
        this.router.navigate(['subadmin-management'])
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      this.service.toastErr('Something Went Wrong')

    })

  }
}
