import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-terms-edit',
  templateUrl: './terms-edit.component.html',
  styleUrls: ['./terms-edit.component.css']
})
export class TermsEditComponent implements OnInit {
  termsAndConditionForm:FormGroup;
  Id: any;
  successData: any;
//description={term:'',privacy:''}
  termDescription: any;
  constructor(public router: Router, public service: MainServicesService) {
    this.termsAndConditionForm=new FormGroup({
      'description':new FormControl('',Validators.required)
    })
   }

  ngOnInit() {
    this.getStaticId();
    this.viewTermsAndConditions();
  }


  getStaticId(){
    this.Id = JSON.parse(localStorage.getItem('terms'));
    console.log('id ===>>',this.Id);

  }


  updateTermsAndConditions(){
let apireq={
  staticId:this.Id,
  type: 'TERMS',
  description:this.termsAndConditionForm.value.description
}
console.log(apireq)
this.service.postApi(`static/updateStaticContent`,apireq,1).subscribe(response=>{
  if(response["responseCode"]==200){
    console.log("updated Data=====",response)
    this.service.showSuccess('Terms & condition updated successfully')
  this.router.navigate(['static-content-management'])
  }
  else{
    this.service.toastErr(response['responseMessage'])
  }
  },error=>{
    this.service.toastErr('Something went wrong')
  
  })
  }


  viewTermsAndConditions(){
    let apireq = {
      type: 'TERMS'  
      }
      console.log('apireq ==>>', apireq)
      this.service.postApi('static/getStaticContent',apireq,1).subscribe((success:any)=> {
        console.log(success)
        this.successData=success;
        if (success.responseCode === 200) {
          this.termDescription = success['result'];
          console.log(this.termDescription)
          this.termsAndConditionForm.patchValue({
            'description':this.termDescription.description,
          })
         
         
          localStorage.setItem('terms',JSON.stringify(this.successData.result._id));
          
      }
    },error => {
      console.log('Something went wrong');
    })
  }
}
