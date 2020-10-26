import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';

@Component({
  selector: 'app-tutorials-view',
  templateUrl: './tutorials-view.component.html',
  styleUrls: ['./tutorials-view.component.css']
})
export class TutorialsViewComponent implements OnInit {
  Images: any;

  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.viewTutorial()
  }

  viewTutorial(){
    let apireq = {
      type: 'TUTORIAL'  
      }
      console.log('TutorialReq ==>>', apireq)
      this.service.postApi('static/getStaticContent',apireq,1).subscribe((success:any)=> {
       //console.log('Tutorial Views:',success)
        this.Images=success.result.image;
        console.log("Image are:--->",this.Images)
       if (success.responseCode === 200) {
          
            localStorage.setItem('tutorial',JSON.stringify(success.result._id));
       }
    },error => {
      console.log('Something went wrong');
    })
  }
}
