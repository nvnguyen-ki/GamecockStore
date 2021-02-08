import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class orders {



    userOrders = [
      {id:1,quantity:5,date:'2021-2-4',amount:24.0},
      {id:2,quantity:5,date:'2021-2-4',amount:24.0}
    ]

    constructor() { 

    }

    returnOrder(){
		return this.userOrders;
	}
}