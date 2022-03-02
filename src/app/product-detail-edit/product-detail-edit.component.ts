import { filter, map, pluck, Observable, switchMap, of } from 'rxjs';
import { IProduct } from './../model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail-edit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.css'],
})
export class ProductDetailEditComponent implements OnInit {
  form!: FormGroup;
  initialFormValue: unknown;

  constructor(
    private productService: ProductService,
    private routes: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      size: [''],
    });
  }

  ngOnInit(): void {
    this.productService.ProductList$();
    this.routes.params
      .pipe(
        pluck('name'),
        map((value) => this.productService.getProduct(value)),
        filter((product) => !!product),
        switchMap((product) => of(this.initForm(product)))
      )
      .subscribe((rs) => (this.form = rs));
  }

  initForm(product: IProduct | undefined): FormGroup {
    this.form.patchValue({
      name: product?.name,
      description: product?.description,
      size: product?.size,
    });
    this.initialFormValue = this.form.value;
    return this.form;
  }
}
