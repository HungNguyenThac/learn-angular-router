import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, pluck } from 'rxjs';
import { IProduct } from '../../model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct | undefined;
  constructor(
    private productService: ProductService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.ProductList$();
    this.routes.params
      .pipe(
        pluck('name'),
        map((value) => this.productService.getProduct(value)),
        filter((product) => !!product)
      )
      .subscribe((rs) => (this.product = rs));
  }

  handleClickEditProduct(name: string) {
    this.router.navigate(['/product', name, 'edit']);
  }
}
