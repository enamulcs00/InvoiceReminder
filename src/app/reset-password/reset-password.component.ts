import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainServicesService } from '../main-services.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm : FormGroup;
  id: any;
  constructor(public router: Router,public activatedRoute : ActivatedRoute,public service: MainServicesService) { }

  ngOnInit() {
    this.buildResetPasswordForm();
    this.getId();
  }

  buildResetPasswordForm(){
    this.resetPasswordForm=new FormGroup({
      "password": new FormControl('', ([Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)])),
      "confirmPassword": new FormControl('', ([Validators.required, Validators.minLength(8)])),
    });
  }

  getId(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params
      console.log('Reset id  ==>>', this.id);
    })
  }

  onResetClick(){

let resetData={
  userId: this.id.id,
  "password": this.resetPasswordForm.value.password,
  "confirmPassword": this.resetPasswordForm.value.confirmPassword
}
console.log("hello", this.resetPasswordForm.value, "in req data", resetData)

    this.service.postApi('user/resetPassword', resetData, 1).subscribe(response => {
      console.log("in success>>>>>", response)
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage'])
        this.router.navigate(['login'])
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
    },error=>{
      this.service.toastErr('Something Went Wrong')
    })

  }
}
