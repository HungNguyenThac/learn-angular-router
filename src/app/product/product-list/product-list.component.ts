import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList!: Observable<IProduct[]>;

  constructor(private ProductService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productList = this.ProductService.ProductList2$();
  }

  handleClickItem(item: IProduct) {
    this.router.navigate(['/product', item.name]);
  }
}
