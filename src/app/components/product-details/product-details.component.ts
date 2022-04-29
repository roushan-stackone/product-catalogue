import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ProductActionsService } from 'src/app/services/product-actions.service';
import { ProductsRestService } from 'src/app/services/products-rest.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe = new Subject();

  productId: any;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productsRestService: ProductsRestService,
    private productService: ProductActionsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    // getting the selected product ID from the url/route
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        console.log(params);
        this.productId = params.productId;
        this.getProductDetails();
      });
  }

  // gets product details by making an api call
  getProductDetails() {
    this.productsRestService.getProductById(this.productId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(product => {
        this.product = product;
        console.log(this.product);
      });
  }

  // adds item to the cart
  addToCart() {
    this.productService.addToCart(this.product);
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
