import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProductPagePage } from './edit-product-page.page';

const routes: Routes = [
  {
    path: '',
    component: EditProductPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProductPagePageRoutingModule {}
