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
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
  constructor(private router: Router, public orderService: orders, private db: AngularFirestore) {

    console.log("Initiating order list page constructor.")
      this.order = null
      this.orderCollection = null
      var user = localStorage.getItem("user")
      // check if local storage isn't empty
      if (JSON.parse(user) !== null) {
        this.uid = JSON.parse(user).uid
      } else {
        console.log("currently not logged in!")
      }
      if (this.uid !== undefined ) {
        this.orderCollection = this.db.collection<Order>('users/'+this.uid+"/orders");
        this.order = this.orderCollection.snapshotChanges().pipe(
        map( actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          });
        }))
      } else {
        this.order = null
      }
  }
  async ngOnInit() {
    this.orderList = this.order;
    console.log(this.orderList)
  }
  viewOrder(order: any){
    this.router.navigate(["/order-detail-page",order])
  }

}
