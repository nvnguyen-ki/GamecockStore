import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../modal/order';
import { orders } from '../services/orders.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.page.html',
  styleUrls: ['./order-list-page.page.scss'],
})
export class OrderListPagePage implements OnInit{
  uid:any
  orderList:Observable<Order[]>
  public loaded: boolean = false;
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
  constructor(private router: Router, public orderService: orders, private db: AngularFirestore, private fbAuth : AngularFireAuth) {
  }
  ngOnInit() {
  }
  async ionViewWillEnter() {
    var user = localStorage.getItem('user')
    // check user local storage 
    try{
      if (user!==null) {
        var uid = await JSON.parse(user).uid
        this.orderCollection = this.db.collection<Order>('users/'+uid+"/orders");
        this.order = this.orderCollection.snapshotChanges().pipe(
        map( actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          });
        }))
        this.orderList = this.order
      } else {
        this.order = null
      }
    } catch{
      console.log("not logged in!")
    }
  }
  viewOrder(order: any){
    this.router.navigate(["/order-detail-page",order])
  }

}
