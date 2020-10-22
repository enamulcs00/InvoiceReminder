import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(public router: Router,private fb:FormBuilder,public activatedRoute : ActivatedRoute , public service: MainServicesService) { }

  ngOnInit() {
    this.buildForgotPasswordForm();
  }
  
  onSubmitClick(){
    //this.router.navigate(['reset-password'])
    let addEmail={
      "email": this.forgotPasswordForm.value.email,
    }
    console.log("hello", this.forgotPasswordForm.value, "in req data", addEmail)

    this.service.postApi('admin/forgotPassword', addEmail, 1).subscribe(response => {
      console.log("in success>>>>>", response)
      if (response['responseCode'] == 200) {
        this.service.showSuccess(response['responseMessage'])
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
    },error=>{
      this.service.toastErr('Something Went Wrong')
    })
  }
  buildForgotPasswordForm(){
    this.forgotPasswordForm=new FormGroup({
      email: new FormControl('', ([Validators.required, Validators.pattern((/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)), Validators.maxLength(50)])),
    });
  }
  
}
