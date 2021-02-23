import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css']
})
export class EditOffersComponent implements OnInit {
  editOfferForm:FormGroup;
  urls:any =[];
  fetching:boolean = false;
  IsUpdateOffer:boolean = true;
  user_id: string;
  fromDate: Date;
  startdate:any;
  hours: any;
  minutes: any;
  seconds: any;
  milliseconds: any;
  startDate:any;
  twoDate: Date;
  endDate:string;
  calender: any = { todate: '', formdate: '' }                                                                   
  editoffer_id: any;
  id: any;
  getofferdata: any;
  getOffer: any;
  items: any;
  editOffer_image: any=[];
  imagedata: any=[];
  editofferdata: any;
  viewOffer_id: any;
  all_id: any;
  editOffer_id: any;
  nowDate2: any;
  todayDate: Date;
  toMaxDate: Date;


  constructor(private router:Router, private service:MainServicesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activatedRoute.queryParams.subscribe((params2)=>{
       
       this.viewOffer_id=JSON.parse(params2.viewOffer_id)
       console.log("viewOffer_id_on_editoffer===>>",this.viewOffer_id)
     })

     this.activatedRoute.queryParams.subscribe((params)=>{
       this.editOffer_id=JSON.parse(params.editOffer_id)
       console.log('editOffer_id_on=====>>>',this.editOffer_id)
     })

    this.editOfferForm = new FormGroup({
      'image' : new FormControl(''),
      'offerTag' : new FormControl(''),
      'offerCode' : new FormControl(''),
      'startdate' : new FormControl(''),
      'enddate' : new FormControl(''),
    })
    // this.user_id = localStorage.getItem('addofferdata_id');
    // console.log('user_id===>>',this.user_id)
      // this.todate();
      // this.setdate();
    // this.getId();
    this.todayDate = new Date()
    this.toMaxDate = new Date()
    this.getOfferdata();
  }
 onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                   console.log('urls==>',this.urls)
                }

                reader.readAsDataURL(event.target.files[i]);
               
        }
    }
  }

  // getId(){
  //   this.activatedRoute.params.subscribe(params => {
  //     this.id = params.id
  //     console.log('param is edit  ==>>',this.id);
  //   })
  // }

  formdate(){
    
    this.fromDate = new Date()
    this.setdate();
    // console.log('CruntTime====>>',this.hours,":",this.minutes,":",this.seconds,".",this.milliseconds);
  
    console.log('CruntTime====>>',this.startDate)
    
  }
  todate(){
    this.twoDate = new Date()
    // this.endDate = this.twoDate.toISOString();
    this.endDate = this.editOfferForm.value.endDate.toISOString();

    console.log('enddate====>>>',this.endDate)

    this.setdate();
  }
  setdate(){
   
    var obj =new Date()
    // this.startDate =  obj.toISOString();
    this.startDate = this.editOfferForm.value.startDate.toISOString();
    console.log('stardatae==>>',this.startDate)
    
    // this.hours= obj.getHours();
    // this.minutes=obj.getMinutes();
    
    // if(this.minutes<10){
    //   this.minutes="0"+(this.minutes).toString()      
    // }    
    // this.seconds=obj.getSeconds();
    // if(this.seconds<10){
    //   this.seconds="0"+(this.seconds).toString()
    // }
    // this.milliseconds=obj.getMilliseconds();
    // if(this.milliseconds<10){
    //   this.milliseconds="0"+(this.milliseconds).toString()
    // }
    // console.log('CruntTime====>>',this.hours,":",this.minutes,":",this.seconds);
  
    console.log('CruntTime====>>',this.startDate)

  }
  getOfferdata(){

      if(!this.viewOffer_id){
        var object = {
          offerId : this.editOffer_id,
        }
      }else if(!this.editOffer_id){
        var object = {
          offerId : this.viewOffer_id,
        }
      }

 
    this.service.postApi('offer/getOffer',object,1).subscribe((data: any) => {
       console.log('offer/getOffer_Api==>>',data)
      if (data.responseCode == 200) {
        // this.service.showSuccess('Data found successfully');
        this.items = data.result
        this.editofferdata = data.result
         console.log('editofferdata00000000==>>',this.editofferdata )
        this.editOfferForm.patchValue({
          'image':this.items[0].Image,
          'offerTag':this.items[0].offerTagLine,
          'offerCode':this.items[0].offerCode ,
          'startdate':this.items[0].startDate,
          'enddate':this.items[0].endDate,
        })
        this.urls = data.result[0].image
        console.log("to check getOffer===>>",this.items)
            }
    })
  }



  update(){
    this.fetching = true;
    this.IsUpdateOffer =false;
    // console.log("in updated form Data >>>>",this.editOfferForm.value,this.editOfferForm.value.fullName)
     if(!this.viewOffer_id){
    var object ={
      "_id"         : this.editOffer_id,
      "offerTagLine": this.editOfferForm.value.offerTag,
      "offerCode"   : this.editOfferForm.value.offerCode,
      "image"       : this.urls,
      // "startDate"   : this.editOfferForm.value.startdate+'T'+this.hours+':'+this.minutes+':'+this.seconds+'.'+this.milliseconds+'Z',
      // "endDate"     : this.editOfferForm.value.enddate+'T'+this.hours+':'+this.minutes+':'+this.seconds+'.'+this.milliseconds+'Z',
      "startDate"   : this.editOfferForm.value.startdate,
       "endDate"     : this.editOfferForm.value.enddate,
    }
  }else if(!this.editOffer_id){
    var object ={
      "_id"         : this.viewOffer_id,
      "offerTagLine": this.editOfferForm.value.offerTag,
      "offerCode"   : this.editOfferForm.value.offerCode,
      "image"       : this.urls,
      // "startDate"   : this.editOfferForm.value.startdate+'T'+this.hours+':'+this.minutes+':'+this.seconds+'.'+this.milliseconds+'Z',
      // "endDate"     : this.editOfferForm.value.enddate+'T'+this.hours+':'+this.minutes+':'+this.seconds+'.'+this.milliseconds+'Z',
      "startDate"   : this.editOfferForm.value.startdate,
       "endDate"     : this.editOfferForm.value.enddate,
    }
  }
    console.log('UPDATE OBJECT CREATED ===>>>',object)
    this.service.postApi('offer/editOffer',object,1).subscribe((res:any)=>{
        // console.log('ediioffer=====>',res)
        if(res.responseCode == 200){
          this.editoffer_id = res.result2
          this.editofferdata = res.result
            this.router.navigate(['offer-promo-management']);
        }

        // this.router.navigate(['offer-promo-management']);
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

    removeImage(i){
      this.urls.splice(i, 1);
    }
}
