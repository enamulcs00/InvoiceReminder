import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';

declare var $: any;



@Component({
  selector: 'app-offer-promo-management',
  templateUrl: './offer-promo-management.component.html',
  styleUrls: ['./offer-promo-management.component.css']
})
export class OfferPromoManagementComponent implements OnInit {
  [x: string]: any;
  totalPage:any;
  searchkey: any = '';
  pageNo: any = 1;
  page:any;
  pageNumber: any = 1;
  user: any = [];
  srNo: number;
  srNumber: number;
  value: any;
  id: any;
  uploadimag: any;
  promotiondata: any;
  message: any;
  newData: any = [];
  p: number = 1;
  getofferdata:any;
  paginationData: any = {};
  limit:any;
  calender: any = { todate: '', formdate: '' }
  fromDate: any;
  
  twoDate: any;
  
  todayDate: Date;
  total: any;
  activeTab: any = localStorage.getItem('tabname') ? localStorage.getItem('tabname') : 'offers';


  constructor(private router: Router, private service: MainServicesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.switchTab(this.activeTab)


    // *********************Add offer _id******************************
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.obj;


    });
    // this.activatedRoute.queryParams.subscribe((tabs)=>{
    //   console.log('tabs==>',tabs.promotions)
    // })

    this.activatedRoute.queryParams.subscribe((params2) => {
      // this.addpromotion_id = JSON.parse(params2.addpromotion_id)
      this.addpromotion_id = params2.addpromotion_id
    });
    this.todayDate = new Date()
    this.toMaxDate = new Date()

  }

  //  to switch between tabs
  switchTab(tab) {
    localStorage.setItem('tabname', tab)
    // this.activeTab = tab
    this.activeTab = localStorage.getItem('tabname') ? localStorage.getItem('tabname') : 'offers';


    if (tab == 'offers' && this.activeTab == "offers") {
      localStorage.setItem('tabname', "offers")
      this.getOfferdata(this.pageNumber, this.searchkey);
      // this.activeTab  =localStorage.getItem('token')
    } else if (tab == 'promotions' && this.activeTab == "promotions") {
      this.getOfferdata(this.pageNumber, this.searchkey);

    }
    // this.getOfferdata(this.pageNumber,this.searchkey);

    // to reset data 
    this.getofferdata = [];
    this.pageNumber = 1;
    this.searchkey = ''
  }


  // to get offer data 
  getOfferdata(page, searchkey) {
    this.getofferdata = []
    var object, url
    object = {
      search: searchkey,
      pageNumber: page,
      'fromDate': this.fromDate,
      'toDate': this.twoDate
    }
    if (this.activeTab == 'offers') {
      url = 'offer/getOffer'
    } else if (this.activeTab == 'promotions') {
      url = 'promotion/getPromotion'
    }
    this.service.postApi(url, object, 0).subscribe((data: any) => {
      if (data.responseCode === 200) {
        this.getofferdata = data.result;
        console.log('this.getofferdata', this.getofferdata)
        if (data.result.length > 0) {
          this.paginationData = data.paginationData
          this.limit = this.paginationData.limit
          this.page = this.paginationData.page
          this.pages = this.paginationData.pages
          this.totalPage = this.paginationData.total
        }
      } else {
        this.paginationData = {
          'limit': 10,
          'page': 1,
          'pages': 0,
          'total': 0
        }
      }
    }, err => {
      if (err.responseCode == 404) {
        alert('404')
      }
    })
  }

  // to search by date
  searchFilter() {
    this.pagenUmber = 1;
    this.getOfferdata(this.pageNumber, '')
  }


  // for pagination
  paginationControl(page) {
    this.getOfferdata(page, '')
  }

  searchByData(val) {
    this.searchkey = val;
    this.pageNumber = 1
    this.getOfferdata(this.pageNumber, this.searchkey)
  }

  formdate() {

    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.toISOString().slice(0, 10)

  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.toISOString().slice(0, 10)
  }
  // *************************Pagination********************************



  // ************************'offer/getOffer' Api******************************************


  view(items) {
    this.value = items;
    this.router.navigate(['view-offers', items._id])
  }



  view1(id) {
    this.value = id;
    let viewPromotion = this.value;
    this.router.navigate(['view-promotion/:id'], {
      queryParams: { viewPromotion: JSON.stringify(viewPromotion) }
    })
  }
  editoffer(id) {
    this.value = id;
    let editOffer_id = this.value;
    this.router.navigate(['edit-offers/:id'], {
      queryParams: { editOffer_id: JSON.stringify(editOffer_id) }
    });
  }

  deleteUserFunc(id, status) {
    this.deleteId = id;
    this.status = 'DELETE';
    $('#delete').modal('show');
  }

  deleteUser() {
    var data = {
      offerId: this.deleteId,
      status: this.status,
    }

    this.service.postApi('offer/deleteOffer', data, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {

        this.switchTab('offers')

        this.service.showSuccess('Offer deleted successfully')

        this.router.navigate(['offer-promo-management'])

      }

    })
  }
  editPromotion(id) {
    this.value = id;
    let editPromotion_id = id;
    // this.router.navigate(['promotion-edit/'+id])
    this.router.navigate(['promotion-edit/:id'], {
      queryParams: { editPromotion_id: JSON.stringify(editPromotion_id) }
    })
  }



  deletePromotion(id, status) {
    this.deleteId = id;
    this.status = 'DELETE';
    $('#promotion').modal('show');
  }
  deleterPromotionUser() {
    var data = {
      promotionId: this.deleteId,
      status: this.status,
    }
    this.service.postApi('promotion/deletePromotion', data, 1).subscribe((success: any) => {
      if (success.responseCode == 200) {
        this.switchTab('promotions')
        // this.switchTab('offers')
      }
    })

  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.getofferdata.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Offer Tagline": element.offerTagLine,
        "Offer Code": element.offerCode,
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Offer&Promotion Management');
  }



}

