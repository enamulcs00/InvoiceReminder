import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../../main-services.service';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-subadmin',
  templateUrl: './add-subadmin.component.html',
  styleUrls: ['./add-subadmin.component.css']
})
export class AddSubadminComponent implements OnInit {
  addSubAdminForm : FormGroup;
  constructor(public router: Router, public service: MainServicesService) { 

    this.addSubAdminForm = new FormGroup({
      'fullName': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])), 
      "password": new FormControl('', ([Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', ([Validators.required, Validators.minLength(8)])),
      "email": new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/), Validators.maxLength(50)])),
      'dashboard':new FormControl(false),
      'userManagement':new FormControl(false),
      'subAdminManagement':new FormControl(false),
      'offerAndPromotionManagement':new FormControl(false),
      'helpCenterManagement':new FormControl(false),
      'staticContentManagement':new FormControl(false),
      
    })
  }

  ngOnInit() {
  }


  addUser() {
   
    if (this.addSubAdminForm.controls['confirmPassword'].value != this.addSubAdminForm.controls['password'].value || this.addSubAdminForm.invalid) {
      return
    }
    

    let addData = {
      "userType":"SUBADMIN",
      "fullName": this.addSubAdminForm.value.fullName,
      "email": this.addSubAdminForm.value.email,
      "password": this.addSubAdminForm.value.password,
      dashboard:this.addSubAdminForm.value.dashboard,
      userManagement:this.addSubAdminForm.value.userManagement,
      subAdminManagement:this.addSubAdminForm.value.subAdminManagement,
     // manageRecords:this.addSubAdminForm.value.manageRecords,
      categoryManagement:this.addSubAdminForm.value.categoryManagement,
      packageManagement:this.addSubAdminForm.value.packageManagement,
      offerAndPromotionManagement:this.addSubAdminForm.value.offerAndPromotionManagement,
      transactionManagement:this.addSubAdminForm.value.transactionManagement,
      helpCenterManagement:this.addSubAdminForm.value.helpCenterManagement,
      staticContentManagement:this.addSubAdminForm.value.staticContentManagement,
    }
    console.log("hello", this.addSubAdminForm.value, "in req data", addData)

    this.service.postApi('admin/addSubAdmin', addData, 1).subscribe(response => {
      console.log("in success>>>>>", response)
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage'])
        this.router.navigate(['subadmin-management'])
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
    },error=>{
      this.service.toastErr('Something Went Wrong')
    })
  }

}
