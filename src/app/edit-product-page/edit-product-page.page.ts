import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../modal/product';
import { products } from '../services/products.service';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.page.html',
  styleUrls: ['./edit-product-page.page.scss'],
})
export class EditProductPagePage implements AfterViewInit {

  product: Product = {
    id:'',
    name:"",
    description:"",
    src:"",
    category:"",
    userid:"",
    price:null
  }
  userid: any;
  constructor(private route: ActivatedRoute, public productService: products, private router:Router, private alertController: AlertController) { 
    var user = localStorage.getItem("user")
    // check if local storage isn't empty
    if (JSON.parse(user) !== null) {
      this.userid = JSON.parse(user).uid
    } else {
      console.log("currently not logged in!")
    }
  }

  
  async successAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success!',
      message: 'Check out the new changes',
      buttons: ['OK']
    });
    await alert.present();
  }

  // get id of item to edit
  ngAfterViewInit() {
    this.route.params.subscribe(
  		param => {
  			this.product = {id:param.id, name:param.name,
        description:param.description,
        src:param.src,
        category:param.category,
        userid:param.userid,
        price:param.price};
  		}
  	)
    console.log(this.product)
  }
  

   editProduct(){
    // check if owner
      this.productService.editProduct(this.product);
      this.router.navigate([""])
      this.successAlert()
    }
  

}
