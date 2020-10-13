import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {
  addofferstatus: any;
  offerlistdata: any;
  addofferdataid: string;
  image: any = [];
  id: any;
  private imageSrc: any = [];
  uoploadimage: string;

  getofferdata1: any;
  get: any;
  promotion_id: any;
  value: any;

  constructor(private router: Router, private service: MainServicesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
  //  *****************addOffer Api _id***********************
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      console.log('paramsdata22222vview_id========>>>>', this.id)

    })
  
 

    this.viewdata();

  }


  viewdata(){

    var data = {
      offerId: this.id,


    }
    console.log('offer_id==>>', data)
    this.service.postApi('offer/getOffer', data, 1).subscribe((res: any) => {
      console.log('response==>>>', res)
      if (res.responseCode == 200) {
        this.service.showSuccess('Data found successfully')
        this.get=res.result

        console.log("get===>>>",this.get[0]._id)
        this.getofferdata1 = res.result[0].image
        console.log('this.getofferdata1 ==', this.getofferdata1)



      }
    })

  }
edit(id){
  this.value=id;
  let viewOffer_id:any= this.value;
  console.log("viewOffer_iddd==>>",viewOffer_id)
this.router.navigate(['edit-offers/:id'],{
  queryParams:{viewOffer_id:JSON.stringify(viewOffer_id)}
})
  console.log('value====>>',this.value)

  
}

}
