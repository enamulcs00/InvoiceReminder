import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {
  offerForm:FormGroup;
  private imageSrc: any = [];
  image:any =[];
  addoferdara: any;
  addofferdata: any=[];
  srNo: number;
  calender: any = { todate: '', formdate: '' }
  fromDate: any;
  twoDate: any;
  total: any;
  hours: any;
  minit: any;
  minutes: any;
  time: any;
  today: any;
  second: any;
  startDate: any;
  endDate: any;
  seconds: any;
  milliseconds: number;
  addofferdata1: any=[];
  selectedFiles: any =[];
  urls = [];
  id: any;
  addofferdata_status: any;
  secdata: any;
  seconddata: string;
  minutesdata: string;
  somethingChanged: any;
  nowDate2: any;
  todayDate: Date;
  toMaxDate: Date;
  

  constructor(private service: MainServicesService, private router:Router,private fb:FormBuilder) {
  
   }

  ngOnInit() {

       this.offerForm = this.fb.group({
      'image'         : new FormControl('', Validators.compose([Validators.required])),
      'offerTagline'  :  ['',Validators.compose([Validators.required, Validators.maxLength(20)])],
      'password'      :  ['',Validators.compose([Validators.required, Validators.maxLength(16)])],
      'startDate'     : new FormControl('',Validators.required),
      'endDate'       : new FormControl('',Validators.required),
       })
       this.todayDate = new Date()
      this.toMaxDate = new Date()
 
      }
  
      onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                    }
                    reader.readAsDataURL(event.target.files[i]);
                    console.log('urls==>',this.urls)
                  }
                }
              }
// *******************************offer/addOffer' Api*************************************************


  addOffer(){
    if(this.seconds<10){
      this.seconddata='0'+this.seconds
        console.log('this.seconddata1==>',this.seconddata)
          }
            else{
              this.seconddata = this.seconds
                console.log('this.seconddata2==>',this.seconddata)
                 }
                  if(this.minutes<10){
                    this.minutesdata ='0'+this.minutes
                      console.log('this.minutesdata ==>',this.minutesdata )
                        }else{
                          this.minutesdata =this.minutes
                            console.log('this.minutesdata==>',this.minutesdata)
                              }
         
                var request ={
                "offerTagLine"  : this.offerForm.value.offerTagline,
                "image"         : this.urls,
                "offerCode"     : this.offerForm.value.password,
                "startDate"     : this.offerForm.value.startDate+'T'+this.hours+':'+this.minutesdata+':'+this.seconddata+'.'+this.milliseconds+'Z',
                "endDate"       : this.offerForm.value.endDate+'T'+this.hours+':'+this.minutesdata+':'+this.seconddata+'.'+this.milliseconds+'Z'
                }
                console.log('adddofferapi===>>',request)
                this.service.postApi('offer/addOffer',request,0).subscribe((data:any)=>{
                if(data.responseCode == 200){
                this.addofferdata1 = data.result1
                this.id =data.result1._id
                console.log('addofferdata1===>>',this.addofferdata1)
                console.log('id===>>',this.id)
                this.addofferdata_status = data.result1
                var obj ={
                _id: this.id,
                status: this.addofferdata_status,
                }
                console.log('obje===>>',obj)
                this.router.navigate(['offer-promo-management'],{
                queryParams:{obj:JSON.stringify(obj)}
                }) 
                this.router.navigate(['offer-promo-management'])
                } 
                })
                this.offerForm.reset();
                }

                formdate() {
                this.fromDate = new Date()
                this.setdate();
                }

                todate() {
                this.twoDate = new Date()
                this.endDate = this.twoDate.toString();
                console.log('enddate====>>>', this.endDate)
                this.setdate();
                }

                setdate() {
                var obj = new Date()
                this.startDate = obj.toString();
                this.hours = obj.getHours();
                this.minutes = obj.getMinutes();
                this.seconds = obj.getSeconds();
                this.milliseconds = obj.getMilliseconds();
                }

                backBtn(){
                this.router.navigate(['offer-promo-management'])
                }
 
   
                changed(event) {
                if (event) {
                this.nowDate2 = event;
                }
                else {
                this.nowDate2 = ''
                }
                }
                
                fromMaxDate(event) {
                if (event) {
                this.todayDate = new Date(event)
                } else {
                this.todayDate = new Date()
                }
                }
  
}

