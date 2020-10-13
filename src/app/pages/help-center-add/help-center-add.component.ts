import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-center-add',
  templateUrl: './help-center-add.component.html',
  styleUrls: ['./help-center-add.component.css']
})
export class HelpCenterAddComponent implements OnInit {
  addForm: FormGroup
  

  constructor(public router: Router, public service: MainServicesService) {
    this.addForm = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.required])),
      category: new FormControl('', Validators.compose([Validators.required])),
      contact: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      'serviceCenterLocation': new FormControl('', Validators.compose([Validators.required]))
    })
   }


  ngOnInit() {
  }



 addHelpCenter(){

  let addData = {
    "category": this.addForm.value.category,
    "name": this.addForm.value.name,
    "contact": this.addForm.value.contact,
    "serviceCenterLocation": this.addForm.value.serviceCenterLocation,
    "description": this.addForm.value.description,
  }
  console.log("hello", this.addForm.value, "in req data", addData)

  this.service.postApi('service/addHelpCenter', addData, 1).subscribe(response => {
    console.log("in success>>>>>", response)
    if (response['responseCode'] == 200) {
      this.service.showSuccess('Help Center Added Successfully')
      this.router.navigate(['help-center-management'])
    }
    else{
      this.service.toastErr(response['responseMessage'])
    }
  },error=>{
    this.service.toastErr('Something Went Wrong')
  })
}
 
}

