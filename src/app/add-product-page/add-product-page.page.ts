import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { products } from '../services/products.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { File } from "@ionic-native/file/ngx";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';  
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  itemDetails: FormGroup;
  userid:any
  result:any;
  imgfile:any = "";
  constructor(
  private camera:Camera,
  private file: File,
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
      url: new FormControl(this.imgfile, Validators.required)
      // date:new FormControl('', Validators.required)
    });
  }

 

  goHome(){
    this.router.navigate(['']);
  }

  async addItem(value: { Top: boolean; Bottom: boolean; name: any; price: any; url: any; description: any; }){
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
    await this.productService.createItem(value.name,value.price, checkedCategory, this.imgfile, value.description, this.userid);
    this.goHome()
  }

  async takePicture() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      var page=this;
      this.camera.getPicture(options).then(async (imageData) => {
        
        let imageid = (Math.floor(Math.random() * 2000)).toString();
        let filename = "userItem"+imageid+'.jpg'
      var storageRef = firebase.storage().ref();
      var ImageRef = storageRef.child('images/'+filename);
      var data='data:image/jpeg;base64,' + imageData
  
        await ImageRef.putString(data, 'data_url').then(async function(snapshot) {
           console.log('Uploaded a base64 string!');
  
             await snapshot.ref.getDownloadURL().then(async function(downloadURL) {
              console.log('File available at', downloadURL);
              page.imgfile = await downloadURL;
            });
             
           });
      }, (err) => {
       // Handle error
       console.log("Camera issue: " + err);
      });
  
    }
}
