import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent implements OnInit {
  addPromoForm: FormGroup;
  stardate:any;
  StartDateFirst:boolean = true;
  urls: any = [];
  hours: any;
  minutes: any;
  seconds: any;
  milliseconds: number;
  fromDate: Date;
  startDate: any;
  twoDate: Date;
  endDate: string;
  addprmodata: any;
  image:any =[];
  private imageSrc: any = [];
  seconddata: string;
  minutesdata: string;
  nowDate2: any;
  todayDate: Date;
  toMaxDate: Date;
  constructor(private router: Router, private service: MainServicesService) { }

  ngOnInit() {
       this.addPromoForm = new FormGroup({
      'image': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      })
      this.todayDate = new Date()
      this.toMaxDate = new Date()
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
  formdate() {
    this.fromDate = new Date()
    this.setdate();
    this.StartDateFirst = false;
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

  // ********************************promotion/addPromotion Api **********************************


  addPromo(){
    // this.image.push(this.imageSrc)
    console.log('second==>>','0'+this.seconds)
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
          }
            else{
                this.minutesdata =this.minutes
                  console.log('this.minutesdata==>',this.minutesdata)
                    }


    var request = {
      "image": this.urls,
      "startDate": this.addPromoForm.value.startDate + 'T' + this.hours + ':' + this.minutesdata + ':' + this.seconddata + '.' + this.milliseconds + 'Z',
      "endDate": this.addPromoForm.value.endDate + 'T' + this.hours + ':' + this.minutesdata + ':' + this.seconddata + '.' + this.milliseconds + 'Z'
    }
    console.log('addpromo_object=====>>>',request)
      this.service.postApi('promotion/addPromotion',request,0).subscribe((data: any) => {
        if (data.responseCode === 200) {
          this.addprmodata = data.result1;
            this.service.showSuccess("Promotion added successfully");
               console.log('this.addprmodata==>>>',this.addprmodata)
                let addpromotion_id:any = this.addprmodata._id;
                  console.log('addpromotion_id==>>>',addpromotion_id)
                    this.router.navigate(['offer-promo-management'],{
                      queryParams:{addpromotion_id:addpromotion_id}
                      }) 
                      this.router.navigate(['offer-promo-management'])
                      }
                      })
                      this.addPromoForm.reset();
                      }

            backBtn(){
            this.router.navigate(['offer-promo-management'])
            }

  // *******getPromo ******
 
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
