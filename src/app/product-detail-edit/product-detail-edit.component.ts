
import {filter, map, Observable, of, pluck, switchMap} from 'rxjs';
import {IProduct} from '../model';
import {ActivatedRoute, Router,} from '@angular/router';
import {ProductService} from '../product.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CheckDeactivate} from "../guard/articles.guard";

@Component({
  selector: 'app-product-detail-edit',
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.css'],
})
export class ProductDetailEditComponent implements OnInit, CheckDeactivate {
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
        switchMap((product) => of(this.pathValueForm(product)))
      )
      .subscribe((rs) => (this.form = rs));
  }

  pathValueForm(product: IProduct | undefined): FormGroup {
    this.form.patchValue({
      name: product?.name,
      description: product?.description,
      size: product?.size,
    });
    this.initialFormValue = this.form.value;
    return this.form;
  }

  CheckDeactivate(): Observable<boolean> {
    let currentFormValue = this.form.value;
    const isEdited =
      JSON.stringify(currentFormValue) !==
      JSON.stringify(this.initialFormValue);
    return of(!isEdited || confirm('Do you want to cancel changed?'));
  }
}
