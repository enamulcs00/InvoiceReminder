import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $: any;
declare var kendo: any
@Component({
  selector: 'app-help-center-management',
  templateUrl: './help-center-management.component.html',
  styleUrls: ['./help-center-management.component.css']
})
export class HelpCenterManagementComponent implements OnInit {
  searchkey: any;
  user: any;
  paginationData: any;
  pageNo: number = 1;
  srNo: number;
  deleteId: any;
  status: string;
  helpCenterId: any;
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: false,
    headers: ["Sr.No", "Category", "Name", "Contact", "Location"]
  };
  arr: any = []
  userType: any;
  constructor(public router: Router, public service: MainServicesService) { }

  ngOnInit() {
    this.search(this.pageNo)
    // this.check();
    this.userType = JSON.parse(localStorage.getItem('type'))

  }


  search(page) {
    console.log(page)
    this.pageNo = page;
    let postData = {
      search: this.searchkey,
      pageNumber: this.pageNo,
    }


    this.service.postApi(`service/getHelpCenterDetails`, postData, 1).subscribe(response => {
      // console.log("to check userlist", JSON.stringify(response))
      if (response['responseCode'] == 200) {
        this.user = response;
        this.paginationData = response['paginationData']
        this.srNo = (this.pageNo - 1) * this.paginationData.limit
        this.check();
        // console.log("check sl no>>>>", this.paginationData, this.srNo, this.pageNo, this.paginationData.limit)
      }
      else {

        this.service.toastErr(response['responseMessage'])


      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')

    })



  }
  // edit(){
  //   console.log("edit Id>>>>",)
  //   this.router.navigate(['help-center-edit/'])
  // }

  edit(id) {
    console.log("edit Id>>>>", id)
    this.router.navigate(['help-center-edit/' + id])
  }

  delete(id, status) {
    this.deleteId = id;
    this.status = 'DELETE';
    $('#delete').modal('show');
    console.log('User Id===>>', this.deleteId, this.status)
  }


  deleteCenter() {
    let apireq = {
      'helpCenterId': this.deleteId,
      'status': this.status
    }
    console.log('apireq ==>>', apireq)
    this.service.postApi('service/deleteHelpCenter', apireq, 1).subscribe((success: any) => {
      console.log(success)
      if (success.responseCode === 200) {
        this.search(this.pageNo)
        $('#delete').modal('hide');
      }
    }, error => {
      console.log('Something went wrong');
    })
  }


  logoutFunc() {
    $('#logout_modal').modal('hide');
    this.router.navigateByUrl('/login')
  }

  // card1() {
  //   console.log("hiii")
  //   kendo.drawing
  //     .drawDOM("#myCanvas",
  //       {
  //         paperSize: "A5",
  //         margin: { top: "0.8cm", bottom: "5cm" },
  //         scale: 5.8,
  //         height: 500,
  //         // landscape : false,
  //         // border: "none",
  //         // overflow:'initial'
  //       })
  //     .then(function (group) {
  //       kendo.drawing.pdf.saveAs(group, "Exported.pdf")

  //     });
  // }

  check() {
    let postData = {
      search: '',
    }
    var data = {}
    this.service.postApi(`service/getHelpCenterDetails`, postData, 1).subscribe(response => {
      // console.log("to check userlist", JSON.stringify(response))
      if (response['responseCode'] == 200) {
        var user = response['result'];
        for (var i = 0; i < user.length; i++) {
          data = {
            'Sr.No': i + 1,
            'Category': user[i].category,
            'Name': user[i].name,
            'Contact': user[i].contact,
            'Location': user[i].serviceCenterLocation
          }
          this.arr.push(data);
        }
        // this.getCSV()
        console.log("this.arr>>>>", this.arr)
      }
      else {
        this.service.toastErr(response['responseMessage'])
      }
    }, error => {
      // this.service.toastErr('Something Went Wrong')
    })
    // new ngxCsv(arr, 'My file',this.options);
  }

  getCSV() {

    new ngxCsv(this.arr, 'My file', this.options);
  }

}
