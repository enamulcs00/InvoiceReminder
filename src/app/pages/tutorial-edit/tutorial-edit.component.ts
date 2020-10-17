import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';

@Component({
  selector: 'app-tutorial-edit',
  templateUrl: './tutorial-edit.component.html',
  styleUrls: ['./tutorial-edit.component.css']
})
export class TutorialEditComponent implements OnInit {

  tutorialForm:FormGroup;
  Id: any;
  successData: any;
  tutorialDescription: any;
  constructor(public router: Router, public service: MainServicesService) { 
    this.tutorialForm=new FormGroup({
      'description':new FormControl('',Validators.required)
    })
  }

  ngOnInit() {
    this.getStaticId();
    this.viewTutorial();
  }

  getStaticId(){
    this.Id = JSON.parse(localStorage.getItem('tutorial'));
    console.log('id ===>>',this.Id);

  }

  updateTutorial(){
    let apireq={
      staticId:this.Id,
      type: 'TUTORIAL',
      description:this.tutorialForm.value.description
    }
    console.log(apireq)
    this.service.postApi(`static/updateStaticContent`,apireq,1).subscribe(response=>{
      if(response["responseCode"]==200){
        console.log("updated Data=====",response)
        this.service.showSuccess('Tutorial updated successfully')
      this.router.navigate(['static-content-management'])
      }
      else{
        this.service.toastErr(response['responseMessage'])
      }
      },error=>{
        this.service.toastErr('Something went wrong')
      
      })
  }

  viewTutorial(){
    let apireq = {
      type: 'TUTORIAL'  
      }
      console.log('apireq ==>>', apireq)
      this.service.postApi('static/getStaticContent',apireq,1).subscribe((success:any)=> {
        console.log(success)
        this.successData=success;
        if (success.responseCode === 200) {
          this.tutorialDescription=success['result'];
          this.tutorialForm.patchValue({
            'description':this.tutorialDescription.description
          })
          //this.description.privacy=success.result.description
            localStorage.setItem('tutorial',JSON.stringify(this.successData.result._id));
      }
    },error => {
      console.log('Something went wrong');
    })
  }
}
