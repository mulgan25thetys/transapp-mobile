import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  today :any;

  typeTransfert : any;
  region:any;

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.today = Date.now();
  }
}
