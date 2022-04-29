import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProductActionsService } from 'src/app/services/product-actions.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartProducts: any[] = [];
  protected ngUnsubscribe = new Subject();

  constructor(
    private productsService: ProductActionsService,
    public router: Router,
  ) { }

  ngOnInit() {
    // subscribing to the products service to get the cart products
    this.productsService.addedItems
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(cartItems => {
        this.cartProducts = cartItems;
        console.log(this.cartProducts);
      });
  }

  ngOnDestroy() {
    // unsubscribing to the subscription on destruction of the component
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
