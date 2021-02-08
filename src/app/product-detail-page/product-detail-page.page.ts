import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { products } from '../services/products.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {

   // item={text:"fish sea",price:10,quantity:100,src:'https://i.pinimg.com/564x/c1/73/98/c17398f6af7af7cfe942a8b549eed534.jpg'}
   item=null
   order={quantity:1}
   orders=[];

  constructor(public products:products, private route:ActivatedRoute ) {}

  ngOnInit() {

  	console.log("OnInit");
  	this.route.params.subscribe(
  		param=>{
  			this.item = param;
  			console.log(this.item)
  		}
  		)
  }

}
