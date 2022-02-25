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
  productList!: IProduct[];

  constructor(private ProductService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.ProductService.ProductList$();
    this.productList = this.ProductService.productList;
  }

  handleClickItem(item: IProduct) {
    this.router.navigate(['/product', item.name]);
  }
}
