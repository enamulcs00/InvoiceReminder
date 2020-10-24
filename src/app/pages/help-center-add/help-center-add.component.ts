import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-help-center-add',
  templateUrl: './help-center-add.component.html',
  styleUrls: ['./help-center-add.component.css']
})
export class HelpCenterAddComponent implements OnInit {
  addForm: FormGroup
  categoriesList: any = [];

  constructor(public router: Router, public service: MainServicesService,private formBuilder: FormBuilder) {
    // this.addForm = new FormGroup({
    //   'name': new FormControl('', Validators.compose([Validators.required])),
    //   category: new FormControl('', Validators.compose([Validators.required])),
    //   contact: new FormControl('', Validators.compose([Validators.required])),
    //   description: new FormControl('', Validators.compose([Validators.required])),
    //   'serviceCenterLocation': new FormControl('', Validators.compose([Validators.required]))
    // })
   }
ngOnInit() {
  this.helpCenterForm()
  this.getAllCtegories()
  }

  helpCenterForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['Mobile'],
      serviceCenterLocation:['', Validators.compose([Validators.required])],
      contact: ['', [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      description: ['', [Validators.required,Validators.maxLength(160)]]
    });
  }
  public errorMessages = {
    name: [
      { type: 'required', message: '*Name is required.' }
    ],
    category: [
      { type: 'required', message: '*Category is required.' },
      ],
      contact: [
      { type: 'required', message: '*Phone number is required.' },
      { type: 'pattern', message: 'Please enter a valid phone number.' }
    ],
    serviceCenterLocation:[{
      type: 'required', message: '*Location is Required.'
    }],
    description:[{
      type: 'required', message: '*Message is Required.'},
      { type: 'maxlength', message: 'Message cant be longer than 60 characters.' }
    ]
  };

  get name() {
    return this.addForm.get("name");
  }
  get category() {
    return this.addForm.get('category');
  }
  get contact() {
    return this.addForm.get('contact');
  }
  get serviceCenterLocation() {
    return this.addForm.get('serviceCenterLocation');
  }
  get description() {
    return this.addForm.get('description');
  }

 addHelpCenter(){

  let addData = {
    "category": this.addForm.value.category,
    "name": this.addForm.value.name,
    "contact": this.addForm.value.contact,
    "serviceCenterLocation": this.addForm.value.serviceCenterLocation,
    "description": this.addForm.value.description,
    "lat":3.834017,
    "long": 43.610297,
    "state":"bihar"
  }
  //console.log("hello", this.addForm.value, "in req data", addData)

  this.service.postApi('service/addHelpCenter', addData, 1).subscribe(response => {
    //console.log("in success>>>>>", response)
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
AlphabetOnly(event){
  let pattAlpha = /^([a-zA-Z ])*$/;
  let resultAlpha = pattAlpha.test(event.key);
  return resultAlpha;
} 
NumOnly(event){
  let numericValue = /^[0-9]*$/;
  let resultNum = numericValue.test(event.key);
  return resultNum;
}
getAllCtegories(){
  let channel = "category/listOfCategory"
  this.service.getApi(channel,1).subscribe((res:any)=>{
    console.log('Response of Cat',res)
    this.categoriesList = res.result;
    
  })
}
}

