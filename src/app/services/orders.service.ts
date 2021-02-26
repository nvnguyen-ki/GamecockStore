import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../modal/order';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class orders {
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
    

    constructor(private db: AngularFirestore) { 
      this.orderCollection = this.db.collection<Order>('orders');
      this.order = this.orderCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      }))
    }
    

    createOrder(name:any, quantity:any, date:any, amount:any, uid:any){
      var data: Order
      data = {
        name: name,
        quantity: quantity || '',
        date: date,
        amount: amount,
        userid:uid
      };
      return this.db.collection("orders").doc(uid).update(Object.assign({}, ...[data]))
    }

    returnOrder(){
		return this.order;
	}
}