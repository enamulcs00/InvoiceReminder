import { Component, OnInit } from '@angular/core';
import { MainServicesService } from 'src/app/main-services.service';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  user: any = []
  p: number = 1;
  searchkey: any;
  // paginationData: any;
  srNo: number;
  calender: any = { todate: '', formdate: '' }
  fromDate: any;
  twoDate: any;
  total: any;
  userType: any;

  constructor(public service: MainServicesService) { }

  ngOnInit() {
    this.userType = JSON.parse(localStorage.getItem('type'))
    this.search(this.p)

  }

  formdate() {

    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.toISOString().slice(0, 10)

  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.toISOString().slice(0, 10)
  }

  search(page) {


    this.p = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.p,
      transactionType: "CREDIT",
      fromDate: this.fromDate,
      toDate: this.twoDate

    }


    this.service.postApi(`transaction/gethistory`, postData, 1).subscribe(response => {
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.total = response['paginationData'].total

        // this.paginationData = response['paginationData']
        // this.srNo = (this.pageNo - 1) * this.paginationData.limit
        // console.log("check sl no>>>>", this.paginationData, this.srNo, this.pageNo, this.paginationData.limit)
      }
      else {

        this.service.toastErr(response['responseMessage'])


      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')

    })
  }


  searchFilter() {
    let postData = {
      search: this.searchkey,
      pageNumber: this.p,
      transactionType: "CREDIT",
      fromDate: this.fromDate + "T00:00:00.000Z",
      toDate: this.twoDate + "T23:59:59.000Z"

    }


    this.service.postApi(`transaction/gethistory`, postData, 1).subscribe(response => {
      if (response['responseCode'] == 200) {
        this.user = response['result'];
        this.total = response['paginationData'].total

        // this.paginationData = response['paginationData']
        // this.srNo = (this.pageNo - 1) * this.paginationData.limit
        // console.log("check sl no>>>>", this.paginationData, this.srNo, this.pageNo, this.paginationData.limit)
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')
    })
  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.user.forEach((element, ind) => {
      dataArr.push({
        "S no": ind + 1,
        "Customer Name": element.userName,
        "Package Name": element.packageName,
        "Payment Method": element.paymentMethod,
        "Amount": element.amount

      })
    })

    this.service.exportAsExcelFile(dataArr, 'Transaction Management');
  }



}
