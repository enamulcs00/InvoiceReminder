import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from '../../main-services.service';

@Component({
  selector: 'app-privacy-view',
  templateUrl: './privacy-view.component.html',
  styleUrls: ['./privacy-view.component.css']
})
export class PrivacyViewComponent implements OnInit {
  successData: any;
  description={term:'',privacy:''}
  type:any;
  result: any;
  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.viewPrivacyPolicy();
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
            localStorage.setItem('privacy',JSON.stringify(this.successData.result._id));
      }
    },error => {
      console.log('Something went wrong');
    })
  }
}
