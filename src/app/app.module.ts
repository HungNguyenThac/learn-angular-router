import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routers';
import { HomeComponent } from './home/home.component';
import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProductDetailEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
