import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../modal/product';
import { AlertController } from '@ionic/angular';
import('firebase/database');
@Injectable({
  providedIn: 'root'
})
export class products {
  
  
  
  private items: Observable<Product[]>;
  private itemsCollection:AngularFirestoreCollection<Product>;

    constructor(private db: AngularFirestore, private alertController: AlertController) { 
      
      this.itemsCollection = this.db.collection<Product>('products');
      this.items = this.itemsCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      }))
    }

    deleteProduct(item: any) {
      this.db.collection("products").doc(item.id).delete()
    }

    async notOwnerAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'ALERT:',
        message: 'Only owner can delete or edit',
        buttons: ['OK']
      });
      await alert.present();
    }

    editProduct(item: any) {
      return this.db.collection("products").doc(item.id).update({description:item.description, name: item.name, price: item.price, src:item.src});
    }

    getProduct(id: string): Observable<Product> {
      return this.itemsCollection.doc<Product>(id).valueChanges().pipe(
          take(1),
          map(item => {
            console.log(item)
            return item;
          })
      );
    }

    async createItem(name:any,price:any, category:any, url:any, description:any, uid:any) : Promise<void>{
      var thumbnailURL:any
      var thumbnail = (await firebase.database().ref('images/').orderByKey().limitToLast(1).get()).val()
      var temp:any = Object.values(thumbnail)[0]
      thumbnailURL = temp.thumbnail
      var data: Product
      data = {
        name: name,
        price: price,
        category: category || '',
        src: url,
        description: description,
        userid:uid,
        thumbnail:thumbnailURL || ''
      };
      const id = this.db.createId();
      return this.db.collection("products").doc(id).set(Object.assign({}, data));
    }

    returnList(){
		  return this.items;
	  }
}