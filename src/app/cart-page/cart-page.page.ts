import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../modal/order';
import { orders } from '../services/orders.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {
  userID:any
  orderList:Observable<Order[]>
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
  constructor(private router: Router, public orderService: orders, private db: AngularFirestore, private fbAuth : AngularFireAuth) { }
  ngOnInit() {
  }
  
  async ionViewWillEnter() {
    var user = localStorage.getItem('user')
    // check user local storage 
    try{
      if (user!==null) {
        var uid = await JSON.parse(user).uid
        this.userID = uid
        this.orderCollection = this.db.collection<Order>('users/'+uid+"/cart");
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

  async addOrder(){
    this.orderList.subscribe((e: any)=>{
      this.orderService.createOrder(e,this.userID)
    })
    this.router.navigate(["/tabs/order-list-page"])
  }

  viewOrder(order: any){
    this.router.navigate(["/item-detail",order])
  }
}
