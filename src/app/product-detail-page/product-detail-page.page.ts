import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { orders } from '../services/orders.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {

  item = null
  order = {quantity:1}

  constructor(public orderService:orders, private route:ActivatedRoute, public alertController: AlertController, private router:Router ) {}
  ngOnInit() {

  	console.log("OnInit");
  	this.route.params.subscribe(
  		param=>{
  			this.item = param;
  			console.log(this.item)
  		}
  		)
  }

  orderitem(){
    let id = Math.random() * 999999
		var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todayStr = mm + '/' + dd + '/' + yyyy;
    var totalPrice = this.order.quantity * this.item.price
  	this.orderService.createOrder((id), this.item.name, this.item.price, this.order.quantity, todayStr, totalPrice)
    console.log(this.orderService.userOrders)
    this.goHome()
  }

  goHome(){
    this.router.navigate(['/']);
  }


}
