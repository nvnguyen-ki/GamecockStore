import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orders } from '../services/orders.service';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.page.html',
  styleUrls: ['./order-list-page.page.scss'],
})
export class OrderListPagePage {

  orderList = []
  public loaded: boolean = false;
  constructor(private router: Router, public orderService: orders) {

    this.orderList= this.orderService.returnOrder();
    console.log("Initiating order list page constructor.")
    console.log(this.orderList)
  }
  viewOrder(order){
    this.router.navigate(["/order-detail-page",order])
  }
  

}
