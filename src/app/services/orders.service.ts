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