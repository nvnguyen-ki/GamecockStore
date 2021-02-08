import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListPagePage } from './order-list-page.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPagePageRoutingModule {}
