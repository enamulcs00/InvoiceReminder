import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../main-services.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  editPromoForm: FormGroup;
  urls: any = [];
  fromDate: Date;
  hours: any;
  minutes: any;
  seconds: any;
  milliseconds: any;
  startDate: any;
  twoDate: Date;
  endDate: string;
  calender: any = { todate: '', formdate: '' }
  editPromotion_id: any;
  getPromotiondata: any = [];
  getPromotiondataImage: any = [];
  promotion_Id: any;
  viewPromotion_id: any;
  nowDate2: any;
  todayDate: Date;
  toMaxDate: Date;

  constructor(private router: Router, private service: MainServicesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {

      this.viewPromotion_id = res.viewPromotion_id
      // this.viewPromotion_id =res.viewPromotion_id
      console.log('viewPromotion_id==>>', this.viewPromotion_id)
    })
    this.activatedRoute.queryParams.subscribe((data) => {
       this.editPromotion_id = JSON.parse(data.editPromotion_id)
        // this.editPromotion_id = data.editPromotion_id
      console.log('editPromotion_id==>>',this.editPromotion_id)
    })
    this.editPromoForm = new FormGroup({
      'image': new FormControl(''),
      'startdate': new FormControl(''),
      'enddate': new FormControl(''),
    })
    this.todayDate = new Date()
    this.toMaxDate = new Date()
    this.todate();
    this.setdate();
    this.getpromo();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
            reader.onload = (event: any) => {
              console.log(event.target.result);
                this.urls.push(event.target.result);
                  console.log('urls==>', this.urls)
                    }
                      reader.readAsDataURL(event.target.files[i]);
                    }
                  }
                }

  formdate() {
    this.fromDate = new Date()
    this.setdate();
    console.log('CruntTime====>>', this.hours, ":", this.minutes, ":", this.seconds, ".", this.milliseconds);
    console.log('CruntTime====>>', this.startDate)
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

    if (this.minutes < 10) {
      this.minutes = "0" + (this.minutes).toString()
    }
    this.seconds = obj.getSeconds();
    if (this.seconds < 10) {
      this.seconds = "0" + (this.seconds).toString()
    }
    this.milliseconds = obj.getMilliseconds();
    if (this.milliseconds < 10) {
      this.milliseconds = "0" + (this.milliseconds).toString()
    }


    console.log('CruntTime====>>', this.startDate)

  }
  getpromo() {
    if(!this.viewPromotion_id){
      var obj = {
        promotionId : this.editPromotion_id,
        }
         }else if(!this.editPromotion_id){
          var obj = {
            promotionId : this.viewPromotion_id,
            }
            }       

    this.service.postApi('promotion/getPromotion', obj, 1).subscribe((res: any) => {
        if (res.responseCode == 200) {
          this.urls = res.result[0].image
            this.getPromotiondata = res.result
              this.editPromoForm.patchValue({
                'image': this.getPromotiondataImage[0].image,
                  'startdate': this.getPromotiondata[0].startDate,
                    'enddate': this.getPromotiondata[0].endDate,
                      })
                      }
                      })
                      }



  update() {
    // console.log("in updated form Data >>>>", this.editPromoForm.value, this.editPromoForm.value.startDate)
    if(!this.viewPromotion_id){
      var object = {
      "_id": this.editPromotion_id,
      "image": this.urls,
      "startDate": this.editPromoForm.value.startdate + 'T' + this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds + 'Z',
      "endDate": this.editPromoForm.value.enddate + 'T' + this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds + 'Z'
      }
      }
   else if(!this.editPromotion_id){
      var object = {
      "_id": this.viewPromotion_id,
      "image": this.urls,
      "startDate": this.editPromoForm.value.startdate + 'T' + this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds + 'Z',
      "endDate": this.editPromoForm.value.enddate + 'T' + this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds + 'Z'
    }
    }

    console.log('object==>>>', object);
    this.service.postApi('promotion/editPromotion', object, 1).subscribe((res: any) => {
    console.log('editpromo==>>>', res)
    if (res.responseCode == 200) {
    this.router.navigate(['offer-promo-management'])
    }
    })
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
