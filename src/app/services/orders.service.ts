import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../modal/order';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})

export class orders implements OnInit{
  private order: Observable<Order[]>;
  private orderCollection:AngularFirestoreCollection<Order>;
  data = {
    name: '',
    quantity: '',
    date: '',
    amount: '',
    userid:''
  };
  newOrder = {
    totalCost: '',
    totalItems: '',
    itemName:[],
    userid:''
  };
  constructor(private db: AngularFirestore, public fbAuth: AngularFireAuth){} 
    ngOnInit() {}

    async createOrder(cart:any, uid:any){
      let addrecord = {}
      let totalCost:any = 0
      let totalItems:any = 0
      let items:any[] = []
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todayStr = mm + '/' + dd + '/' + yyyy;
      await cart.forEach(async (e: { amount: number; quantity: number; name: any; })=>{
        totalCost+=e.amount*e.quantity
        totalItems+=e.quantity
        items.push(e)
      })
      console.log(items)
      addrecord['totalCost'] = totalCost
      addrecord['totalItems'] = totalItems
      addrecord['itemName'] = items
      addrecord['date'] = todayStr
      return await this.db.collection(('users/'+uid+"/orders")).add(addrecord)
    }

    deleteOrder(order: any, uid:any) {
      this.db.collection("users").doc(uid+"/orders/"+order.id).delete()
    }

    returnOrder(){
      return this.order;
    }

    async addToCart(name:any, quantity:any, date:any, amount:any, uid:any){
      let addrecord = {}
      addrecord['name'] = name
      addrecord['quantity'] = quantity
      addrecord['amount'] = amount
      addrecord['date'] = date
      addrecord['userid'] = uid
      return await this.db.collection(('users/'+uid+"/cart")).add(addrecord).then(()=>{
        this.data =  {name: '', quantity: '',
          date: '',
          amount: '',
          userid:''}
      })
    }

    deleteItemCart(order: any, uid:any) {
      this.db.collection("users").doc(uid+"/cart/"+order.id).delete()
    }

    returnCart(){
      return this.order;
    }

    
}