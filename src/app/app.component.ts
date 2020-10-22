import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoicerem';
}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { ToastrService } from 'ngx-toastr';
// @Injectable()
// export class MainService {
//     token: any;
//     _id: any;
//     adminId: any;
//     constructor(private http:HttpClient,private toastr: ToastrService) { }

//     // baseUrl =  'http://172.16.6.74:8000/api/v1/';
   
//     baseUrl = window.location.origin+'/api/v1/';
  
   
//     typeLogin: string;
//     postApi(url, data, isHeader) {
//         if(isHeader==0){
//             var httpOptions;
//             httpOptions = {
//                 headers: new HttpHeaders({ 
//                     "Content-Type": "application/json", 
//                 })
//               }
//             return this.http.post((this.baseUrl+ url),data,httpOptions)
//         }
       
//         else if(isHeader==1){
//             var httpOptions;
//             httpOptions = {
//                 headers: new HttpHeaders({
//                     "Content-Type": "application/json", 
//                     "token": localStorage.getItem("token"),
//                      "_id": localStorage.getItem("adminId"),
//                      })
//               }
//               return this.http.post((this.baseUrl + url), data, httpOptions)
//         }
       
//     }

//       getApi(url, isHeader) {
//         if(isHeader==0){
//             var httpOptions;
//             httpOptions = {
//                 headers: new HttpHeaders({ 
//                     "Content-Type": "application/json"
//                 })
//               }
//             return this.http.get((this.baseUrl+ url),httpOptions)
//         }
       
//         else if(isHeader==1){
//             var httpOptions;
//             httpOptions = {
//                 headers: new HttpHeaders({
//                     "Content-Type": "application/json", 
//                     "token": localStorage.getItem("token"),
//                      "_id": localStorage.getItem("adminId"),
//                      })
//               }
//               return this.http.get((this.baseUrl + url), httpOptions)
//         }
        
//       }
     
//       showSuccess(msg) {
//         this.toastr.success(msg);
//       }

//       toastErr(msg) {
// 		this.toastr.error(msg)
// 	}

// }