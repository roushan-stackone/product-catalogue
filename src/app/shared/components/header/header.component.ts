import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ProductActionsService } from 'src/app/services/product-actions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  NumberOfProductsInCart: any = 0;
  protected ngUnsubscribe = new Subject();

  constructor(private productsService: ProductActionsService) { }

  ngOnInit() {
    // subscribe to cart subject in the products service
    this.productsService.addedItems
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(cartItems => {
        this.NumberOfProductsInCart = cartItems.length;
        console.log(this.NumberOfProductsInCart);
      });
  }

  ngOnDestroy() {
    // unsubscribing to the subscription on destruction of the component
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
