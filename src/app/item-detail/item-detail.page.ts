import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orders } from '../services/orders.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {


  order=null;
  userid: any;

  constructor(public ordersList:orders, private route:ActivatedRoute, private router: Router ) {
    var user = localStorage.getItem("user")
    // check if local storage isn't empty
    if (JSON.parse(user) !== null) {
      this.userid = JSON.parse(user).uid
    } else {
      console.log("currently not logged in!")
    }
  }

  ngOnInit() {

  	console.log("OnInit");
  	this.route.params.subscribe(
  		param=> {
  			this.order = param;
  			console.log(this.order)
  		}
  	)
  }

  deleteOrder(){
      this.ordersList.deleteItemCart(this.order,this.userid);
      this.router.navigate(["tabs/cart-page"])
  }

}