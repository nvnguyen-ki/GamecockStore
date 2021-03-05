import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { orders, } from '../services/orders.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { products } from '../services/products.service';
import { authentication } from '../services/auth.service';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  userid :any
  item = null
  order = {quantity:1}
  loginInfo: any;
  hideMe: boolean;

  constructor(public orderService:orders, private route:ActivatedRoute, public alertController: AlertController, private router:Router, public fbauth: authentication, public productService: products ) {
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
  		param=>{
  			this.item = param;
  			console.log(this.item)
  		}
  		)
  }

  ionViewWillEnter() {
    if(this.fbauth.accountType == 'owner'){
      this.hideMe=false;
    }
    else{
      this.hideMe=true;
    }
    console.log(this.hideMe)
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ALERT',
      message: 'Seems like you are not logged in!',
      buttons: ['OK']
    });
    await alert.present();
  }

  orderitem(){
    if (this.userid===undefined) {
      this.errorAlert()
    } else {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var todayStr = mm + '/' + dd + '/' + yyyy;
      var totalPrice = this.order.quantity * this.item.price
      this.orderService.createOrder(this.item.name, this.order.quantity, todayStr, totalPrice, this.userid)
      this.goHome()
    }
    
  }

  deleteProduct(){
    this.productService.deleteProduct(this.item);
    this.router.navigate(["/"])
  }


  editProduct(){
    this.router.navigate(['edit-product-page',this.item])
  }


  // editProduct(){
  //   if (this.userid === "v9WDsBRoBYPcHOFWWFJmIIrhfSq2") {
  //     this.productService.editProduct(this.item);
  //     this.goHome()
  //   }
  //   else {
  //     this.notOwnerAlert()
  //   }
  // }

  goHome(){
    this.router.navigate(['/']);
  }


}
