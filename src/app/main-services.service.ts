import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
// import 'rxjs/add/operator/map';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';





@Injectable({
  providedIn: 'root'
})

export class MainServicesService {

  // private addPromo = new Subject<any>();

  token: any;
  _id: any;
  adminId: any;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // baseUrl = 'http://172.16.16.177:1550/v1/' 
  // baseUrl = 'http://172.16.16.177:1550/'
  // baseUrl = 'http://172.16.1.117:8051/'

  baseUrl = 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1550/v1/'
  // baseUrl = `http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1520/ V1`

  // baseUrl = 'http://162.222.32.20:1451/v1/'
  //   172.16.1.117

  
  

  typeLogin: string;


  postApi(url, data, isHeader) {
    if (isHeader == 0) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      }
      return this.http.post((this.baseUrl + url), data, httpOptions)
    }

    else if (isHeader == 1) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
          // "token": localStorage.getItem("token"),
          //  "_id": localStorage.getItem("adminId"),
        })
      }
      return this.http.post((this.baseUrl + url), data, httpOptions)
    }

  }

  getApi(url, isHeader) {
    if (isHeader == 0) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
      return this.http.get((this.baseUrl + url), httpOptions)
    }

    else if (isHeader == 1) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // "token": localStorage.getItem("token"),
          //  "_id": localStorage.getItem("adminId"),
        })
      }
      return this.http.get((this.baseUrl + url), httpOptions)
    }

  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

  toastErr(msg) {

    this.toastr.error(msg)
  }


  
  // sendMessage(msg1: string) {
  //   this.addPromo.next({ text: msg1 });
  //   console.log('service===>>>', msg1)
  // }
  // getMessage(): Observable<any> {
  //   return this.addPromo.asObservable();
  // }
  // getMessage(): Observable<any> {
  //   return this.send_Form.asObservable();
  // }


  //Export
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

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