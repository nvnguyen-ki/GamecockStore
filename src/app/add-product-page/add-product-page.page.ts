import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { products } from '../services/products.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  itemDetails: FormGroup;

  constructor(
    private router: Router,
   public formBuilder: FormBuilder,
       public productService: products

) { }

  ngOnInit() {
    this.itemDetails = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      toy: new FormControl(false, Validators.required),
      food: new FormControl(false, Validators.required),
      drink: new FormControl(false, Validators.required),
      price: new FormControl(false, Validators.required),
      url: new FormControl(false, Validators.required)
      // date:new FormControl('', Validators.required)
    });
  }
  goHome(){
    this.router.navigate(['/product-list-page']);
  }

  addItem(value){
    var checkedCategory:any
    if(value.toy === true) {
      checkedCategory = 'Toy'
    }
  	if(value.drink === true) {
      checkedCategory = 'Drink'
    }
  	if(value.food === true) {
      checkedCategory = 'Food'
    }
    this.productService.createItem(value.name,value.price, checkedCategory, value.url, value.description);
    this.goHome()

  }
}
