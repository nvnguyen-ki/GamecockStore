import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class products {
  
    

    itemList= [
        {name:"Hoodie", price:29.99, quantity:100, category:"Clothes", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZEz1w_KXESP53LY2TjpeKKyxzin7RxbOEDg&usqp=CAU", description:"Soft cozy Hoodie."},
        {name:"Sweatshirt", price:39.99, quantity:100, category:"Clothes", src:"https://i.pinimg.com/474x/a1/f8/63/a1f863a3e9f157fa0d4e08a9be0494e7.jpg", description:"Soft cozy Sweatshirt."},
        {name:"Sweatpants", price:20.00, quantity:100, category:"Clothes", src:"https://staticx.ibncollege.com/wcsstore/ExtendedSitesCatalogAssetStore/801_400_10_299570171/images/SMALLIMAGE_1448652.jpg", description:"Soft cozy Sweatpants."},
        {name:"Polo", price:50.00, quantity:100, category:"Clothes", src:"https://staticx.ibncollege.com/wcsstore/ExtendedSitesCatalogAssetStore/801_200_130_317526983/images/SMALLIMAGE_1805886.jpg", description:"Cool Polo."},
        {name:"Jacket", price:69.99, quantity:100, category:"Clothes", src:"https://staticx.ibncollege.com/wcsstore/ExtendedSitesCatalogAssetStore/813_100_30_258659380/images/SMALLIMAGE_2107503.jpg", description:"Soft cozy Jacket."}
    ]

    constructor() { 

    }

    createItem(name:any,price:number, category:any, url:any, description:any){
      this.itemList.push({name:name,price:price,quantity:100, category:category, src:url, description:description});
    }

    returnList(){
		return this.itemList;
	}
}