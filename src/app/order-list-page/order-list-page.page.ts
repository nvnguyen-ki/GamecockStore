import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../modal/order';
import { orders } from '../services/orders.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.page.html',
  styleUrls: ['./order-list-page.page.scss'],
})
export class OrderListPagePage implements OnInit{
  uid:any
  orderList:Observable<Order[]>
  public loaded: boolean = false;
  constructor(private router: Router, public orderService: orders, private db: AngularFirestore) {

    
  }
  async ngOnInit() {
    this.orderList = this.orderService.returnOrder();
    console.log(this.orderList)
  }
  viewOrder(order: any){
    this.router.navigate(["/order-detail-page",order])
  }

}
