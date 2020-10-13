import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-privacy-edit',
  templateUrl: './privacy-edit.component.html',
  styleUrls: ['./privacy-edit.component.css']
})
export class PrivacyEditComponent implements OnInit {
  privacyPolicyForm:FormGroup;
  Id: any;
  successData: any;
  privacyDescription: any;
  constructor(public router: Router, public service: MainServicesService) { 
    this.privacyPolicyForm=new FormGroup({
      'description':new FormControl('',Validators.required)
    })
  }

  ngOnInit() {
    this.getStaticId();
    this.viewPrivacyPolicy();
  }

  getStaticId(){
    this.Id = JSON.parse(localStorage.getItem('privacy'));
    console.log('id ===>>',this.Id);

  }

  updatePrivacyPolicy(){
    let apireq={
      staticId:this.Id,
      type: 'PRIVACY',
      description:this.privacyPolicyForm.value.description
    }
    console.log(apireq)
    this.service.postApi(`static/updateStaticContent`,apireq,1).subscribe(response=>{
      if(response["responseCode"]==200){
        console.log("updated Data=====",response)
        this.service.showSuccess('Privacy policy updated successfully')
      this.router.navigate(['static-content-management'])
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
      },error=>{
        this.service.toastErr('Something went wrong')
      
      })
  }

  viewPrivacyPolicy(){
    let apireq = {
      type: 'PRIVACY'  
      }
      console.log('apireq ==>>', apireq)
      this.service.postApi('static/getStaticContent',apireq,1).subscribe((success:any)=> {
        console.log(success)
        this.successData=success;
        if (success.responseCode === 200) {
          this.privacyDescription=success['result'];
          this.privacyPolicyForm.patchValue({
            'description':this.privacyDescription.description
          })
          //this.description.privacy=success.result.description
            localStorage.setItem('privacy',JSON.stringify(this.successData.result._id));
      }
    },error => {
      console.log('Something went wrong');
    })
  }
}
