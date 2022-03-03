import { ProductDetailEditComponent } from './../product-detail-edit/product-detail-edit.component';
import { ArticlesGuard } from './../guard/articles.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },

  /* normal */
  // {
  //   path: ':name',
  //   component: ProductDetailComponent,
  // },

  /* canActivateChild */
  {
    path: ':name',
    canActivateChild: [ArticlesGuard],
    children: [
      { path: '', component: ProductDetailComponent },
      {
        path: 'edit',
        component: ProductDetailEditComponent,
        canDeactivate: [ArticlesGuard],
      },
    ],
  },
];
