import { Component, OnInit } from '@angular/core';
declare var $ : any
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logoutModal() { 
    $('#logout_modal').modal({backdrop:"static",keyboard:false})
  }

  logout() {
    $('#logout_modal').modal('hide')
    localStorage.removeItem('adminInfo')
  }
}
