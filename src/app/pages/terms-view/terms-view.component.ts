import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';

@Component({
  selector: 'app-terms-view',
  templateUrl: './terms-view.component.html',
  styleUrls: ['./terms-view.component.css']
})
export class TermsViewComponent implements OnInit {
  type:any;
  result: any;
  successData: any;
  description={term:'',privacy:''}
  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.viewTermsAndConditions();
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
         
          localStorage.setItem('terms',JSON.stringify(this.successData.result._id));
          
      }
    },error => {
      console.log('Something went wrong');
    })
  }
}
