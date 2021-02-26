import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../modal/product';

@Injectable({
  providedIn: 'root'
})
export class products {
  
  private items: Observable<Product[]>;
  private itemsCollection:AngularFirestoreCollection<Product>;

    constructor(private db: AngularFirestore) { 
      
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

    createItem(name:any,price:any, category:any, url:any, description:any, uid:any) : Promise<void>{
      var data: Product
      data = {
        name: name,
        price: price,
        category: category || '',
        src: url,
        description: description,
        userid:uid
      };
      const id = this.db.createId();
      return this.db.collection("products").doc(id).set(Object.assign({}, data));
    }

    returnList(){
		  return this.items;
	  }
}