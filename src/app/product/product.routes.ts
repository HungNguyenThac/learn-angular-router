import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':name',
    component: ProductDetailComponent,
  },
];