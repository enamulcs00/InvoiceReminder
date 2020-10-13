import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  isActive: any;

  constructor(public router: Router) { }
  per
  type
  flag = false;
  ngOnInit() {
    let url = window.location.href.split('/');
    this.isActive = url[3];
    this.per = JSON.parse(localStorage.getItem('per'))
    this.type = JSON.parse(localStorage.getItem('type'))
    if (this.type == "SUBADMIN") {
      this.flag = true;
    }

  }
  logoutFunc() {
    $('#logout_modal').modal('hide');
    this.router.navigateByUrl('/login')
    localStorage.removeItem('adminInfo')
  }


  logoutModal() {
    $('#logout_modal').modal({ backdrop: "static", keyboard: false })

  }
}
