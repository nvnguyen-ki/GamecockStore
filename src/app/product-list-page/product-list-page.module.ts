import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPagePageRoutingModule } from './product-list-page-routing.module';

import { ProductListPagePage } from './product-list-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPagePageRoutingModule
  ],
  declarations: [ProductListPagePage]
})
export class ProductListPagePageModule {}
