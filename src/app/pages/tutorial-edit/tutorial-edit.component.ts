import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
declare var $:any;
@Component({
  selector: 'app-tutorial-edit',
  templateUrl: './tutorial-edit.component.html',
  styleUrls: ['./tutorial-edit.component.css']
})
export class TutorialEditComponent implements OnInit {
  TutorialForm: FormGroup;
  urls = [];
  Id: any;
  
  constructor(public router: Router, public service: MainServicesService) {
    this.TutorialForm=new FormGroup({
      'image':new FormControl('')
    })
   }

  ngOnInit() {
    this.getStaticId();
    this.viewTutorial()
  }

  viewTutorial(){
    let apireq = {
      type: 'TUTORIAL'  
      }
      console.log('TutorialReq ==>>', apireq)
      this.service.postApi('static/getStaticContent',apireq,1).subscribe((success:any)=> {
       console.log('Tutorial Views:',success)
        this.urls=success.result.image;
       
       if (success.responseCode === 200) {
          
            localStorage.setItem('tutorial',JSON.stringify(success.result._id));
       }
    },error => {
      console.log('Something went wrong');
    })
  }


  
  getStaticId(){
    this.Id = JSON.parse(localStorage.getItem('tutorial'));
    console.log('This is Tutorial id: ===>>',this.Id);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
        console.log('urls==>', this.urls)
      }
    }
  }
UpdateTutorial(){
  let apireq={
    staticId:this.Id,
    type: 'TUTORIAL',
    image:this.urls
  }
  console.log('ReqObject:',apireq)
  this.service.postApi(`static/updateStaticContent`,apireq,1).subscribe(response=>{
    if(response["responseCode"]==200){
     // console.log("updated Data=====",response)
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
// changeImage(){
//   $('#openFile').trigger('click');
  
// }
removeImage(i){
  console.log('These are index Numbers:----->>>>> ',i);
  this.urls.splice(i, 1);
 }
}
