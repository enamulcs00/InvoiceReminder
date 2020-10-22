import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainServicesService } from '../../main-services.service';
import { validateConfig } from '../../../../node_modules/@angular/router/src/config';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;

  //remberMe: any = [];
  token: any;
  loginForm: FormGroup;
  data=[];
  responseData: any = {};
  isRememberMeChecked = false;
  // router: any;
  permission=[];

  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    // this.route.params.subscribe(res => {
    //   console.log(JSON.stringify(res))
    // },err =>{
    //   console.log(err)
    // })
    this.buildLoginForm()
    $(function () {
      $('#email,#password').on('keypress', function (e) {
        if (e.which == 32)
          return true;
      });
    });
  }

  buildLoginForm() {
    let remData=JSON.parse(localStorage.getItem('rememberMe'))?JSON.parse(localStorage.getItem('rememberMe')):'';
    let pass=''
    if(remData!=''){
      pass=window.atob(remData.password)
      }
    
    this.loginForm = new FormGroup({
      "email": new FormControl(remData.email, ([Validators.required, Validators.pattern((/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)), Validators.maxLength(50)])),
      "password": new FormControl(pass, ([Validators.required, Validators.maxLength(16), Validators.minLength(8)])),
      "rememberMe": new FormControl(false)
    })
  }








  //...........login

  login(data) {
    let tempLogin = {
      "email": data.email,
      "password": data.password
    }
    console.log("i am heree >>>>>>", tempLogin)

    this.service.postApi('admin/adminLogin', tempLogin, 0).subscribe((response:any) => {
     // this.router.navigateByUrl('dashboard')
      console.log("in API >>>>>>>>>>", response)
      this.responseData = response;

      // this.data=JSON.parse(localStorage.getItem('members'))?this.data=JSON.parse(localStorage.getItem('members')):[]
      // localStorage.setItem('adminInfo1',JSON.stringify(this.responseData.result.email && this.responseData.result.password));
      
      // var adminId = JSON.parse(localStorage.getItem('adminInfo'));
      // console.log('ADMIN ID===>>>',adminId);
      if (response['responseCode'] == 200) {
        this.permission=response.result.permission
        console.log(this.permission)
          localStorage.setItem('per',JSON.stringify(this.permission))
          localStorage.setItem('type',JSON.stringify(this.responseData.result.userType))
        console.log("going gdasdasasood>>>>>",this.responseData.result)
        localStorage.setItem('adminInfo',JSON.stringify(this.responseData.result._id));
      //   console.log("going good>>>>>",this.responseData.result.token,this.responseData.result._id)
      //   this.service.showSuccess(response['responseMessage'])
      //   localStorage.setItem('token', this.responseData.result.token),
      //     localStorage.setItem('adminId', this.responseData.result._id)
        this.router.navigateByUrl('dashboard')
        this.service.showSuccess(response.responseMessage)
        if(this.loginForm.value.rememberMe==true){
          let remData={
            "email":this.loginForm.value.email,
            "password":window.btoa(this.loginForm.value.password)
          }
          localStorage.setItem('rememberMe',JSON.stringify(remData))
    
      }
    
   
      }
      else {
        console.log("login_err", )
        //this.service.toastErr(response['responseMessage'])
        this.service.toastErr('Invalid credentials')
      }
    }, error => {
      this.service.toastErr('Something went wrong')

    }) 
       

 
  }
}

