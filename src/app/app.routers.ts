import { ArticlesGuard } from './guard/articles.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    canActivate: [ArticlesGuard],
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
];

// lazyload module
// bước 1: trên routes ở mudule con, chỉ để lại các routes children
// bước 2: ở trên module con, bắt buộc phải có RouterModule.forChild()
// bước 3: xoá module con trong import của module cha
// bước 4: sử dụng cú pháp lazyLoad module ở routes cha:
// {path: 'product', loadChildren: ()=>  import('./product/product.module').then((m) => m.ProductModule)}
