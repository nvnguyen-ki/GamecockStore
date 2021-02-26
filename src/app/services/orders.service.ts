import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class orders {

    userOrders = [
      {id:1,item:"Hoodie", price:29.99, quantity:5,date:'02/01/2021',amount:149.95},
      {id:2,item:"Polo", price:50.00,quantity:2,date:'02/01/2021',amount:100.00},
      {id:3,item:"Sweatpants", price:20.00, quantity:1,date:'02/03/2021',amount:20.00},
      {id:4,item:"Jacket", price:69.99,quantity:1,date:'02/05/2021',amount:69.99},
      {id:5,item:"Sweatshirt", price:39.99,quantity:1,date:'02/08/2021',amount:39.99}
    ]

    constructor() { 

    }

    createOrder(id:any,item:any, price:any, quantity:any, date:any, amount:any, userid:any){
      this.userOrders.push({id:id, item:item,price:price, quantity:quantity, date:date,amount:amount});
    }

    returnOrder(){
		return this.userOrders;
	}
}