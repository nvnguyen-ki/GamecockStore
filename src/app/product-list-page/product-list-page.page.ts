import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
import {Storage} from '@ionic/storage'
import {authentication} from '../services/auth.service'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.page.html',
  styleUrls: ['./product-list-page.page.scss'],
})
export class ProductListPagePage implements OnInit{
  itemList:Observable<any[]>
  public loaded: boolean = false;
  hideMe=true;
  
  constructor(private router: Router, public productService: products, public fbauth: authentication) {
        
  }
  ngOnInit(): void {
    this.itemList= this.productService.returnList();
    
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

  viewItem(item:any){
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
    this.fbauth.userID=''
  	this.hideMe=true;
    this.goLogin()
  }

  isLoggedIn(){
    const user = this.fbauth.userProfile()
    if (user !== null) {
      return true
    } else {
      return false
    }
  }

  
}