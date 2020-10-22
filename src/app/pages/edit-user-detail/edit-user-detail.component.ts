import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { countryList } from '../countrylist';


@Component({
  selector: 'app-edit-user-detail',
  templateUrl: './edit-user-detail.component.html',
  styleUrls: ['./edit-user-detail.component.css']
})
export class EditUserDetailComponent implements OnInit {
  user: any;
  id: any;
  editForm:FormGroup;
  countryList: any;
  india="+91 India"

  constructor(public router: Router,public activatedRoute : ActivatedRoute , public service: MainServicesService,public country: countryList) {
    this.countryList = country.CountryStateCity
    this.editForm = new FormGroup({
      //'name':new FormControl('',[Validators.required]),
      //'email':new FormControl('',[Validators.required]),
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      'email': new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/), Validators.maxLength(64)])),
      //'mobile':new FormControl('',[Validators.required]),
      'mobile': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{6,16}$/)])),
      'code':new FormControl('')
    })
   }

  ngOnInit() {
    this.getId();
this.search()
  }

  getId(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
      console.log('param is edit  ==>>', this.id);
    })
  }

  search() {
    let postData = {
      userId: this.id,
      userManagement:1
    }
 
    this.service.postApi(`admin/userList`, postData, 1).subscribe(response => {
      console.log("to check userDetails", response)
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.editForm.patchValue({
          'name':this.user[0].fullName,
          'email':this.user[0].email,
          'code':this.user[0].countryCode ,
          'mobile':this.user[0].mobileNumber,
          'profilePic':this.user[0].profilePic
        })
        console.log("to check getOffer", this.user)
      }

    })
  }

update(){

console.log("in updated form Data >>>>",this.editForm.value,this.editForm.value.fullName)

let postData={
userId: this.id,
email:this.editForm.value.email,
phoneNumber:this.editForm.value.mobile,
fullName:this.editForm.value.name,
countryCode:this.editForm.value.code,
mergeContact:this.editForm.value.code+this.editForm.value.mobile,
adminEdit:"1"
}
this.service.postApi(`user/editProfile`,postData,1).subscribe(response=>{
if(response["responseCode"]==200){
  console.log("updated Data=====",response)
  this.service.showSuccess(response['responseMessage'])
this.router.navigate(['user-management'])
}
else{
  this.service.toastErr(response['responseMessage'])
}
},error=>{
  this.service.toastErr('Something Went Wrong')

})

}

}
