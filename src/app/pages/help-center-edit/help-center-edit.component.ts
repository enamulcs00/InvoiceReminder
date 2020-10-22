import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-center-edit',
  templateUrl: './help-center-edit.component.html',
  styleUrls: ['./help-center-edit.component.css']
})
export class HelpCenterEditComponent implements OnInit {
  editForm: any;
  id: any;
  user: any;

  constructor(public router: Router,public activatedRoute : ActivatedRoute , public service: MainServicesService) {
    this.editForm = new FormGroup({
      //'name':new FormControl('',[Validators.required]),
      //'email':new FormControl('',[Validators.required]),
      'name': new FormControl('', Validators.compose([Validators.required])),
      'category': new FormControl('', ([Validators.required, Validators.maxLength(64)])),
      //'mobile':new FormControl('',[Validators.required]),
      'contact': new FormControl('', Validators.compose([Validators.required])),
      'serviceCenterLocation':new FormControl(''),
      'description':new FormControl('',Validators.compose([Validators.required,Validators.maxLength(256)]))
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
      helpCenterId : this.id,
    }
 
    this.service.postApi(`service/getHelpCenterDetails`, postData, 1).subscribe(response => {
      console.log("to check userDetails", response)
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.editForm.patchValue({
          'name':this.user[0].name,
          'category':this.user[0].category,
          'contact':this.user[0].contact ,
          'serviceCenterLocation':this.user[0].serviceCenterLocation,
          'description':this.user[0].description
        })
        console.log("to check userDetails", this.user)
      }

    })
  }

  update(){

    console.log("in updated form Data >>>>",this.id,this.editForm.value)
    
    let postData={
    helpCenterId: this.id,
    name:this.editForm.value.name,
    contact:this.editForm.value.contact,
    serviceCenterLocation:this.editForm.value.serviceCenterLocation,
    description:this.editForm.value.description,
    }
    this.service.postApi(`service/editHelpCenter`,postData,1).subscribe(response=>{
    if(response["responseCode"]==200){
      console.log("updated Data=====",response)
      this.service.showSuccess(response['responseMessage'])
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
