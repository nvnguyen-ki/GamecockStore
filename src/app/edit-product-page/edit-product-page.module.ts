import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductPagePageRoutingModule } from './edit-product-page-routing.module';

import { EditProductPagePage } from './edit-product-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProductPagePageRoutingModule
  ],
  declarations: [EditProductPagePage]
})
export class EditProductPagePageModule {}
