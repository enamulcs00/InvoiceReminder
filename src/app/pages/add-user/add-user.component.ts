import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../../main-services.service';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';
import { countryList } from '../countrylist';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup
  urlsLength: number;
  activeImage: any = "../assets/img/profile-img.jpg"
  countryList: any;
  india="+91 India"


  constructor(public router: Router, public service: MainServicesService, public country: countryList) {
    this.countryList = country.CountryStateCity
    this.addForm = new FormGroup({
      'fullName': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),

      "email": new FormControl('', ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/), Validators.maxLength(50)])),

      "password": new FormControl ('', ([Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ )])),
      "ConPassword": new FormControl('', ([Validators.required, Validators.minLength(8)])),
      'mobile': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{6,16}$/)])),
      'code': new FormControl(''),
      'image': new FormControl('')
    })
   
  }

  ngOnInit() {
  }

  selectImages(event) {
    var urls = [];
    var file = event.target.files;
    if (file) {
      for (let files of file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          urls.push(e.target.result);
          this.urlsLength = urls.length
          if (this.urlsLength == file.length) {
            this.activeImage = urls[0]
            console.log("ajskdhjsdhsj ==??", this.activeImage)
          }
        }
        reader.readAsDataURL(files);
      }
    }
  }

  addUser() {
    if(this.addForm.value.code==""){
      this.addForm.value.code="+91"
    }
    console.log(this.addForm.value)
    var image;
    if (this.addForm.controls['ConPassword'].value != this.addForm.controls['password'].value || this.addForm.invalid) {
      return
    }
    if (this.activeImage == '../assets/img/profile-img.jpg') {
      image = ""
    } else {
      image = this.activeImage
    }

    let addData = {
      profilePic: image,
      "fullName": this.addForm.value.fullName,
      "email": this.addForm.value.email,
      "password": this.addForm.value.password,
      "countryCode": this.addForm.value.code,
      "mobileNumber": this.addForm.value.mobile,
      "mergeContact": this.addForm.value.code+this.addForm.value.mobile,
    }
    console.log("hello", this.addForm.value, "in req data", addData)

    this.service.postApi('user/signup', addData, 1).subscribe(response => {
      console.log("in success>>>>>", response)
      if (response['responseCode'] == 200) {
        this.service.showSuccess('USER ADDED SUCCESSFULLY')
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
