import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  itemDetails: FormGroup;
  userid:any
  constructor(
  private router: Router,
  public formBuilder: FormBuilder,
  public productService: products,
  public fb:AngularFireAuthModule
  
) { 
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      console.log(user.uid);
      this.userid = user.uid
    } else {
      
    }
  });
}
  ngOnInit() {
    this.itemDetails = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      Top: new FormControl(false, Validators.required),
      Bottom: new FormControl(false, Validators.required),
      Outfit: new FormControl(false, Validators.required),
      price: new FormControl(false, Validators.required),
      url: new FormControl(false, Validators.required)
      // date:new FormControl('', Validators.required)
    });
  }
  goHome(){
    this.router.navigate(['']);
  }

  async addItem(value){
    var checkedCategory:any
    if(value.toy === true) {
      checkedCategory = 'Top'
    }
  	else if (value.drink === true) {
      checkedCategory = 'Bottom'
    }
  	else {
      checkedCategory = 'Outfit'
    }
    this.productService.createItem(value.name,value.price, checkedCategory, value.url, value.description, this.userid);
    this.goHome()
  }
}
