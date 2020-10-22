import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { CanvasJS } from 'chart.js';

// import {map} from 'rxjs/operators';
declare var $ : any;
declare var CanvasJS: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  result: any;
  successData: any;
  description: any;
  helpCenter: any;
  daskForm:FormGroup;
  value="";
  transdata: any;
  helpCenter1: any;
  helpCenter2: string;
  chartData : any = []
  grapgdata: any;
  graphUserdata:any =[];
  userdata:any=[];
  data: any=[];
  mapped: any=[];
  chartValue =[];
  constructor(public router :Router ,public service: MainServicesService) { }

  ngOnInit() {
    console.log('date==',new Date())
    this.daskForm = new FormGroup({
      'selecday' : new FormControl('')
    })
    this. transaction();
    this.totalUser();
    this.totalHelpCenter();
    this.log();
  }
    changed(value) {
    
    this.value = value;
    // console.log('value====>>>',this.value)
    this.log();
  }


         logoutFunc(){
        // $('#logout_modal').modal('hide');
        // this.router.navigateByUrl('/login')
         }
      // *********************************graph/findUser Api*****************************

         totalUser(){
          
         let apireq = {
            
          }
          console.log('apireq ==>>', apireq)
          this.service.postApi('graph/findUser',apireq,1).subscribe((success:any)=> {
          console.log("fgfhfghgfh",success)
          this.successData=success;
          if (success.responseCode === 200) {
          console.log("fdfdg",success.result)
          this.description=success.result
              
          }
          },error => {
          console.log('Something went wrong');
          })
          }
  // ******************************graph/totalHelpCenter Api*********************

          totalHelpCenter(){
      
          let apireq = {
        
          }
      // console.log('apireq ==>>', apireq)
          this.service.postApi('graph/totalHelpCenter',apireq,1).subscribe((success:any)=> {
          console.log("fgfhfghgfh",success)
          this.successData=success;
          if (success.responseCode === 200) {
          console.log("fdfdg",success.result.total)
          this.helpCenter1=success.result
          console.log('graph/totalHelpCenter=====>>>>',success)
    
          
          }
          },error => {
          console.log('Something went wrong');
          })
          }

// *******************************graph/userGraph Api**************************aaaaaa
          log(){
          let data={
            "dayCount": this.value
          }
            console.log('dayCount===value',data)
          console.log('logdada==++',data)
          this.service.postApi('graph/userGraph',data,1).subscribe((success:any)=> {
          console.log("fgfhfghgfh_apiiiii===",success)
          this.successData=success;
          if (success.responseCode === 200) {
           this.grapgdata = success.result
           var obje = Object.keys(success.result)
           console.log('obje==>>',obje)
           var objeValue= Object.values(success.result)
           console.log('objeValue==>>',objeValue)
           for(let i=0; i<obje.length; i++){
            //  console.log('obje===len',obje.length)
                   let obj = 
                         { 'x' :new Date (obje[i]),
                           'y' : objeValue[i],
                          }
                    this.chartValue.push(obj)
           }
           console.log('Object  Finally Formed',this.chartValue)
          var chart = new CanvasJS.Chart("chartContainer",
          {
          axisX:{
            
              gridThickness: 1
          },
          axisY: {
              title: "No of User"
          },
          data: [
          {  
          dataPoints: this.chartValue,
              }
              ]
          });

          chart.render();
          }
          },error => {
          console.log('Something went wrong');
          })
          }
 // ****************************graph/totalTransaction Api********************

          transaction(){
          let data={
        
          }
          this.service.postApi('graph/totalTransaction',data,1).subscribe((success:any)=> {
            
          this.successData=success;
          if (success.responseCode === 200) {
          console.log("fdfdg",success.result.total)
          this.transdata=success.result
          console.log("fgfhfghgfh=========Amit",this.transdata);
              
              
          }
          },error => {
          console.log('Something went wrong');
          })
          }

      //     chart(){
        
      // }
   
  
    
  }


declare var $: any;



@Component({
  selector: 'app-offer-promo-management',
  templateUrl: './offer-promo-management.component.html',
  styleUrls: ['./offer-promo-management.component.css']
})
export class OfferPromoManagementComponent implements OnInit {
  [x: string]: any;

  searchkey: any =''
  // searchkeys:any =''
  pageNumber: any = 1;
  pageNo: any = 1;
  user: any = [];
  srNo: number;
  value: any;
  id: any;
  uploadimag: any;
  promotiondata: any;
  message: any;
  newData: any = [];
  paginationValue:any;



  constructor(private router: Router, private service: MainServicesService,) {

  }

  ngOnInit() {
   
    // *********************Add offer _id******************************
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = JSON.parse(params.obj)
      console.log('params===amit',this.id)

    });
    // this.getOfferdata();
    // this.activatedRoute.queryParams.subscribe((params2) => {
    //   this.addpromotion_id = JSON.parse(params2.addpromotion_id)
    //   console.log('params2====>>',this.addpromotion_id)
    // });

    // this.addPromotion();
    this.search(this.pageNumber)
    this.search2(this.pageNo)
  }
  // *************************Pagination********************************

  search(page){
  console.log("oage===>>",page)
    this.pageNumber =page;
    let object = {
      // search: this.searchkeys,
      pageNumber : this.pageNumber,
      getOffers:"1"
    }
   this.service.postApi('offer/getOffer',object,1).subscribe((data:any)=>{
     console.log("getoffer==data==>>",data)
     if(data.responseCode == 200){
       this.getofferdata = data.result
       this.pagination_value = data.paginationData 
       console.log("getofferdata==>>",this.getofferdata)
       console.log("pagination_value==>>",this.pagination_value)
       this.srNumber = (this.pageNumber -1) * this.pagination_value.limit
       console.log("check get offerr pagination",this.pagination_value,this.pageNumber,this,this.pageNumber)
       
     }
   })
  
}
  






  // ***************************'promotion/getPromotion Api'****************************

  addPromotion() {
    var object1 = {
      promotionId: this.addpromotion_id,
    
    }
    console.log('pgno==>',object1)
    this.service.postApi('promotion/getPromotion', object1, 0).subscribe((res: any) => {
      console.log('promotion/getPromotion===>>', res)
      if (res.responseCode === 200) {
        this.promotiondata = res.result
        this.paginationData = res.paginationData.limit
        
        console.log('promotiondata==>>>', this.promotiondata)
      }

    })
  }
  search2(page){
    console.log("pagenumber22222222222222==>>",page)
    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
      getPromotion:"1"
      
    }
    this.service.postApi('promotion/getPromotion',postData,1).subscribe((data:any)=>{
   console.log('getPromotion==>>>',data)
   if (data['responseCode'] == 200) {
    this.getPromonation_pgi = data
    console.log('getPromonation_pgi',this.getPromonation_pgi)
    this.paginationData = data['paginationData']
    this.srNo = (this.pageNo - 1) * this.paginationData.limit
    console.log("check getPromotion>>>>",this.paginationData ,this.srNo,this.pageNo)
    
  }  

    })
  }


  

 
  view(items) {
    this.value = items;
    console.log('items===>>>', this.value)
    this.router.navigate(['view-offers', items._id])
  }



  view1(items) {
    this.value = items;
    console.log('items===>>>', this.value)
    this.router.navigate(['view-promotion', items._id])
  }
  editoffer(id) {
    console.log(id)
    this.router.navigate(['edit-offers/' + id]);
  }

  deleteUserFunc(id,status){
    this.deleteId = id;
    this.status = 'DELETE';
    $('#delete').modal('show');
    console.log('User Id===>>',this.deleteId, this.status)
  }

  deleteUser() {
    var data = {
      offerId:  this.deleteId,
      status : this.status,
    }

    console.log('data_id==>>', data)
    this.service.postApi('offer/deleteOffer', data, 1).subscribe((res: any) => {
      console.log('delete_api===>>>', res);
      if (res.responseCode == 200)
      this.search(this.pageNumber)
      this.service.showSuccess('Offer deleted successfully')
        
        this.router.navigate(['offer-promo-management'])

    })
  }
  editPromotion(id){
           
    console.log('editPromotion==>>>',id)
    this.router.navigate(['promotion-edit/'+id])
  }



  deletePromotion(id,status){
    this.deleteId = id;
    this.status = 'DELETE';
    $('#promotion').modal('show');
    console.log('promo_delete_id===>>',this.deleteId,this.status)
  }
  deleterPromotionUser(){
    var data = {
      promotionId: this.deleteId,
      status : this.status,
    }
    console.log('deleterPromotionUser===>>',data)
    this.service.postApi('promotion/deletePromotion',data,1).subscribe((success:any)=>{
      console.log('delet_api_of_getpromo===>>>',success)
      if (success.responseCode == 200){
        this.search(this.pageNumber)
        this.search2(this.pageNo)
      }
    })

  }


}



 

