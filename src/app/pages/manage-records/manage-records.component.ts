import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MainServicesService } from '../../main-services.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.css']
})
export class ManageRecordsComponent implements OnInit {

  id: any;
  user: any = [];
  user_id: any;
  u: any;
  userrecorddata: any;
  value: any;
  _id: any;
  userId: any;
  imagelength: any;
  page:any = 1;
  paginationData: any;
  srNo: number;

  constructor(public activatedRoute: ActivatedRoute, public service: MainServicesService) { 
    
  }

  ngOnInit() {
    this.getId();
    this.search();
    this.userRecord(this.page)
  }

  getId() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
      console.log('param is ==>>', this.id);
    })
  }


  search() {
    let postData = {
      userId: this.id,
      userManagement: 1
    }
    this.service.postApi(`admin/userList`, postData, 1).subscribe((response: any) => {
            if (response['responseCode'] == 200) {
            this.user = response.result
            this.user_id = response.result[0]._id
            console.log("to check  id==", this.user_id)
            // console.log("to check userDetails", this.user)
            // this.userRecord(this.page);
            console.log("page No.",this.page);
          }
    })

  }

  userRecord(page) {
    this.page=page;
    let object = {
    userId: this.id,
    pageNumber: this.page,
    getAllDocument:"1"
    }
    console.log('userId22222===>>', object)
    this.service.postApi(`document/getAllDocument`, object, 1).subscribe((res: any) => {
      console.log('documnt/getAllDocument===>>', res)
      if (res.responseCode == 200) {
        this.userrecorddata = res
        // this.imagelength = res.result
        this.paginationData = res['paginationData']
        this.srNo = (this.page - 1) * this.paginationData.limit
        console.log("check sl no>>>>",this.paginationData ,this.srNo,this.page)
   
           console.log("page number of pagination===",this.userrecorddata.paginationData.page);
        console.log('userrecorddata====>>>', this.userrecorddata)
      }
    })


  }

  view(data) {
    this.value = data;
    console.log("view===>>", this.value)
 
  }
  delete(id){
   this.userId=id;
   console.log("user_id===>>>", this.userId)
  }
  deleteSubmit(){
    var object ={
      documentId: this.userId,
    }
    this.service.postApi('document/deleteDocument',object,1).subscribe((res:any)=>{
      console.log('response===>>>',res)
      if(res.responseCode == 200){
        this.service.showSuccess('Document deleted successfully')
        this.userRecord(this.page);
      }
    })
  }




}
