import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListPagePage } from './product-list-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListPagePageRoutingModule {}
