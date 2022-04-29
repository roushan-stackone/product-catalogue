import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductActionsService } from 'src/app/services/product-actions.service';
import { ProductsRestService } from 'src/app/services/products-rest.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe = new Subject();
  public products: any[];
  public error: HttpErrorResponse;

  constructor(
    private productsRestService: ProductsRestService,
    private productsService: ProductActionsService,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // getting prducts list
    this.getProducts();
  }

  // gets the products list by making an API request
  getProducts() {
    this.productsRestService.getProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(products => {
        this.products = products;
        console.log(this.products);
      },
        error => {
          this.productsRestService.handleHttpError(error);
        }
      );
  }

  // adds product to the cart
  addToCart(product: any) {
    this.productsService.addToCart(product);
    console.log(product);
    this.showNotification('Added to cart', 'close');
  }

  // shows notification with material snackbar
  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  ngOnDestroy() {
    // unsubscribing to the subscription on destruction of the component
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}
