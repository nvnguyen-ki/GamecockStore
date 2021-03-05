import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../modal/order';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class orders {
  uid:any
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
  data = {
    name: '',
    quantity: '',
    date: '',
    amount: '',
    userid:''
  };
    constructor(private db: AngularFirestore){ 
      this.uid = JSON.parse(localStorage.getItem('user')).uid;
      console.log(JSON.parse(localStorage.getItem('user')).uid)
      this.orderCollection = this.db.collection<Order>('users/'+this.uid+"/orders");
        this.order = this.orderCollection.snapshotChanges().pipe(
        map( actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data}
          });
        }))
    } 

    


    async createOrder(name:any, quantity:any, date:any, amount:any, uid:any){
      let addrecord = {}
      addrecord['name'] = name
      addrecord['quantity'] = quantity
      addrecord['amount'] = amount
      addrecord['date'] = date
      addrecord['userid'] = uid
      return await this.db.collection(('users/'+uid+"/orders")).add(addrecord).then(()=>{
        this.data =  {name: '', quantity: '',
          date: '',
          amount: '',
          userid:''}
      })
    }

    deleteOrder(order: any, uid:any) {
      this.db.collection("users").doc(uid+"/orders/"+order.id).delete()
    }

    returnOrder(){
		return this.order;
	}
}