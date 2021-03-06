import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import './sakura.ts'
import { Sakura } from './sakura';
import * as M from 'materialize-css';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMain = true;
  sidenav;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let route = val.url.split("?").shift();
        if (route != '/' && route != '/search' && route != '/morecontent' && route != '/about') {
          this.isMain = false
        } else {
          this.isMain = true
        }

      }

    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.startSakura();

  }

  openSideNav() {
    this.sidenav.open()
  }

  comingSoonToast() {
    M.toast({ html: 'Coming soon!' })
  }

  public startSakura() {

    var elems = document.querySelector('.sidenav');
    this.sidenav = M.Sidenav.init(elems);
    M.updateTextFields();
  }

}
