import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';

@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {
type:any;
  result: any;
  successData: any;
  description={term:'',privacy:''}
  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.viewTermsAndConditions();
    this.viewPrivacyPolicy();
  }

  onTermsEditClick(){
    this.router.navigate(['terms-edit'])
  }

  onPrivacyEditClick(){
    this.router.navigate(['privacy-edit'])
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
          this.description.term=success.result.description
          if(this.description.term.length>50){
            this.description.term=this.description.term.slice(0,100)+'...'
          }
         
          localStorage.setItem('terms',JSON.stringify(this.successData.result._id));
          
      }
    },error => {
      console.log('Something went wrong');
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
          this.description.privacy=success.result.description
          if(this.description.privacy.length>50){
            this.description.privacy=this.description.privacy.slice(0,100)+'...'
          }
            localStorage.setItem('privacy',JSON.stringify(this.successData.result._id));
      }
    },error => {
      console.log('Something went wrong');
    })
  }

  
}
