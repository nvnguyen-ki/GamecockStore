import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AlertController } from '@ionic/angular';
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
  public fb:AngularFireAuthModule,
  public alertController: AlertController
  ) { 
    var user = localStorage.getItem("user")
    // check if local storage isn't empty
    if (JSON.parse(user) !== null) {
      this.userid = JSON.parse(user).uid
    } else {
      console.log("currently not logged in!")
    }

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
    if(value.Top === true) {
      checkedCategory = 'Top'
    }
  	else if (value.Bottom === true) {
      checkedCategory = 'Bottom'
    }
  	else {
      checkedCategory = 'Outfit'
    }
    await this.productService.createItem(value.name,value.price, checkedCategory, value.url, value.description, this.userid);
    this.goHome()
  }
}
