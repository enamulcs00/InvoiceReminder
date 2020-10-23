import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/main-services.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
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
  active: any;
  activedata: number;
  day: () => number;
  dt: Date;
  dateString: string;
  todaydate: Date;
  dates: number;
  constructor(public router :Router ,public service: MainServicesService) { }

  ngOnInit() {
    console.log('date==',new Date())
    this.daskForm = new FormGroup({
      'selecday' : new FormControl('')
    })
    this. transaction();
    this.totalUser();
    this.userActive();
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
          // console.log("fdfdg",success.result)
          this.description=success.result.docs.length
          console.log('description===>>>',this.description)
              
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
          this.helpCenter1=success.result.docs.length
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
          //console.log('dayCount===value',data)
          //console.log('logdada==++',data)
          this.service.postApi('graph/userGraph',data,1).subscribe((success:any)=> {
          console.log("Data Fetched for Graph : ",success)
          this.successData=success;
          if (success.responseCode === 200) {
           this.grapgdata = success.result
           var obje = Object.keys(success.result)
           console.log('value==>>',this.value)
           var objeValue= Object.values(success.result)
           //console.log('objeValue==>>',objeValue)
          
           this.chartValue = [] ;
          for(let i=0; i<obje.length; i++){
              // console.log('obje===len',obje.length)
                          let obj = 
                          { 'x' : new Date(obje[i]),
                           'y' : objeValue[i],
                          }
                          this.chartValue.push(obj)
                         }
           

           if(this.value=='Weekly'){
           console.log("Weekly Data called Inside IF")
           this.chartValue = [] ;
           for(let i=0; i<obje.length; i++){
            console.log('Object Data >>>>>> getFullYear >>>>>>> ',obje[i])
            this.dt= new Date()
            this.dt.getFullYear()
            console.log('dt===',this.dt.getDate())
            this.dateString = new Date(this.dt).toUTCString();
             this.dateString  =  this.dateString .split(' ').slice(0, 4).join(' ');
            console.log( 'date==',this.dateString );
                 
            this.todaydate= new Date()
           this.dates= this.getWeekNum(new Date(obje[i]))
           console.log('dates===>',this.dates)
            console.log('todaydate===>>',this.todaydate.getDate())
                          
                          let obj = 
                          { 'x' : new Date(obje[i]),
                          'label':this.dates+'week',
                           'y' : objeValue[i],
                          }
                          this.chartValue.push(obj)
                          // if(this.chartValue==null){
                          //   alert('ok')
                          // }
                          }

                          // let obj = 
                          // { 'x' :this.getWeekNum(new Date(obje[i])),
                          // label:this.dateString,
                          //  'y' : objeValue[i],
                          // }
                          // this.chartValue.push(obj)
                          // // if(this.chartValue==null){
                          // //   alert('ok')
                          // // }
                          // }
                          
           console.log('Weekly Chat prepared ',this.chartValue)
           } 

           if(this.value=='Daily'){
          
            console.log("Weekly Data called Inside IF")
            this.chartValue = [] ;
            for(let i=0; i<obje.length; i++){
             // console.log('Object Data >>>>>> getFullYear >>>>>>> ',obje[i])
     
             let days=new Date(obje[i])
             console.log('11day==>>',days)
            var day =days.getDate()
             console.log('day==>>',day)

             this.dt= new Date()
             console.log('dt===',this.dt.getFullYear())
             this.dateString = new Date(this.dt).toUTCString();
              this.dateString  =  this.dateString .split(' ').slice(0, 4).join(' ');
             console.log( 'date==',this.dateString );

                           let obj = 
                           { 'x' : day,label:this.weekAndDay(new Date(obje[i])) ,
                           
                            'y' : objeValue[i],

                           }
                           this.chartValue.push(obj)
                           // if(this.chartValue==null){
                           //   alert('ok')
                           // }
                           }
                           
            console.log('Weekly Chat prepared ',this.chartValue)
            } 




           else {
            console.log(" In Else Part of value == weekly")
           }
           console.log('Chart Value Formed : ',this.chartValue)
           var chart = new CanvasJS.Chart("chartContainer",
           {
            theme: "light2",
            title:{
              text: this.dateString,
            },
           axisX:{
           title: this.value,
           
           gridThickness: 2,
           interval: 1,
          //  label:this.chartValue,
           },
           axisY: {
           title: "No of User",
            gridThickness: 1,
           interval: 1, 
           },
         
           data: [
           {  
           type: "line",
         
           dataPoints: this.chartValue,
        
          //  gridThickness: 2,
           }]
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
          this.transdata=success.result.total
          console.log("fgfhfghgfh=========Amit",this.transdata);
              
              
          }
          },error => {
          console.log('Something went wrong');
          })
          }

          userActive(){
            this.service.getApi('graph/activeUser',1).subscribe((data:any)=>{
              console.log('graph/activeUser===>>>',data)
              this.active=data.total
              console.log("activedata22===>>",this.active)
              
              // this.activedata =Math.round(this.active * 100) / 100
              this.activedata =Math.round(this.active)
              console.log("activedata===>>",this.activedata)
            })
          }

      //     chart(){
        
      // }
    
    getWeekNum(date:any){
      let weekNum :any;
      weekNum = new Date(date.getFullYear(),0,1);
     return Math.ceil((((date - weekNum) / 86400000) + weekNum.getDay()+1)/7);
}

weekAndDay(date) {
    
  var days = ['Sunday','Monday','Tuesday','Wednesday',
              'Thursday','Friday','Saturday'],
      prefixes = ['', '', '', '', ''];

  return prefixes[Math.floor(date.getDate() / 7)] + ' ' + days[date.getDay()];

}




  }
  

 

