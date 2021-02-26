import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
import {Storage} from '@ionic/storage'
import {authentication} from '../services/auth.service'
import firebase from 'firebase/app';
import 'firebase/auth';
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.page.html',
  styleUrls: ['./product-list-page.page.scss'],
})
export class ProductListPagePage {
  userid:any
  itemList = []
  public loaded: boolean = false;
  constructor(private router: Router, public productService: products, public fbauth: authentication) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        this.userid = user.uid
      } else {
      }
    });
    this.itemList= this.productService.returnList();
    console.log("Initiating product list page constructor.")
    console.log(this.itemList)
  }
  
  viewItem(item){
    this.router.navigate(["/product-detail-page",item])
  }

  newItemView(){
    this.router.navigate(["/add-product-page"])
  }

  goLogin(){
    this.router.navigate(["login-page"])
  }

  signOut(){
    this.fbauth.fblogout()
  }

  isLoggedIn(){
    const user = this.fbauth.userProfile()
    if (user !== null) {
      return true
    } else {
      return false
    }
  }

  isOwner(){
    if (this.userid != "v9WDsBRoBYPcHOFWWFJmIIrhfSq2") {
      return false
    } else {
      return true
    }
  }
}
