import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderListPagePageRoutingModule } from './order-list-page-routing.module';

import { OrderListPagePage } from './order-list-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderListPagePageRoutingModule
  ],
  declarations: [OrderListPagePage]
})
export class OrderListPagePageModule {}
