import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IProduct } from './model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList!: IProduct[];
  constructor() {}

  ProductList$() {
    of<IProduct[]>([
      {
        name: 'productA',
        description: 'Sản phẩm A',
        size: 'A',
      },
      {
        name: 'productB',
        description: 'Sản phẩm B',
        size: 'B',
      },
      {
        name: 'productC',
        description: 'Sản phẩm C',
        size: 'C',
      },
      {
        name: 'productD',
        description: 'Sản phẩm D',
        size: 'D',
      },
      {
        name: 'productE',
        description: 'Sản phẩm E',
        size: 'E',
      },
    ]).pipe(map((rs) => (this.productList = rs)));
  }

  getProduct(name: string): IProduct | undefined {
    return this.productList.find((pr) => pr.name === name);
  }

  ProductList2$(): Observable<IProduct[]> {
    return of<IProduct[]>([
      {
        name: 'productA',
        description: 'Sản phẩm A',
        size: 'A',
      },
      {
        name: 'productB',
        description: 'Sản phẩm B',
        size: 'B',
      },
      {
        name: 'productC',
        description: 'Sản phẩm C',
        size: 'C',
      },
      {
        name: 'productD',
        description: 'Sản phẩm D',
        size: 'D',
      },
      {
        name: 'productE',
        description: 'Sản phẩm E',
        size: 'E',
      },
    ]);
  }

  getProduct2(name: string): Observable<IProduct | undefined> {
    return this.ProductList2$().pipe(
      map((rs) => rs.find((rs) => rs.name === name))
    );
  }
}
