import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.page.html',
  styleUrls: ['./product-list-page.page.scss'],
})
export class ProductListPagePage {
  itemList = []
  public loaded: boolean = false;
  constructor(private router: Router, public productService: products) {

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

}
