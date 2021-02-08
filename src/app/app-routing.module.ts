import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-list-page',
    loadChildren: () => import('./product-list-page/product-list-page.module').then( m => m.ProductListPagePageModule)
  },
  {
    path: 'order-list-page',
    loadChildren: () => import('./order-list-page/order-list-page.module').then( m => m.OrderListPagePageModule)
  },
  {
    path: 'product-detail-page',
    loadChildren: () => import('./product-detail-page/product-detail-page.module').then( m => m.ProductDetailPagePageModule)
  },
  {
    path: 'add-product-page',
    loadChildren: () => import('./add-product-page/add-product-page.module').then( m => m.AddProductPagePageModule)
  },
  {
    path: 'order-detail-page',
    loadChildren: () => import('./order-detail-page/order-detail-page.module').then( m => m.OrderDetailPagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
