import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../main-services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {
  promotion_id: any;
  getofferdata1: any;
  get: any;
  getpromo: any;
  image: any;
  value: any;

  constructor(private router: Router, private service: MainServicesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.promotion_id =JSON.parse(params.viewPromotion);
      console.log('promotion_id11111========>>>>',params.viewPromotion)

    })
    this.viewdata();
    
  }
  viewdata(){

    var data = {
      promotionId :   this.promotion_id,
    }
    console.log('promotion_id==>>',data)
    this.service.postApi('promotion/getPromotion',data,1).subscribe((res: any) => {
      console.log('response22==>>>', res)
      if (res.responseCode == 200) {
        this.service.showSuccess('Data found successfully')
        this.get=res.result
        console.log("get===>>",this.get)
        this.image=res.result[0].image
        console.log('get==>>',this.get)
      }
    })

  }
edit(id){
 this.value=id;
 console.log('value==>>>',this.value)
 let viewPromotion_id=this.value;
  this.router.navigate(['promotion-edit/:id'],{
    queryParams:{viewPromotion_id:viewPromotion_id}
    
  });

}
}
