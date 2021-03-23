import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'product-list-page',
        loadChildren: () => import('../product-list-page/product-list-page.module').then(m => m.ProductListPagePageModule)
      },
      {
        path: 'cart-page',
        loadChildren: () => import('../cart-page/cart-page.module').then(m => m.CartPagePageModule)
      },
      {
        path: 'order-list-page',
        loadChildren: () => import('../order-list-page/order-list-page.module').then(m => m.OrderListPagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/product-list-page',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/product-list-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
