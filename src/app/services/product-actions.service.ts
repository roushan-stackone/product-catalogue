import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductActionsService {

  //initializing empty cart
  private cartItems: any[] = [];

  public addedItems = new BehaviorSubject<any>(this.cartItems);

  // adding product to the cart and updating the subscribers
  public addToCart(product: any) {
    this.cartItems.push(product);
    this.addedItems.next(this.cartItems);
  }

  //removing product from the cart and updating the subscribers
  public removeFromCart(product: any) {
    this.cartItems.splice(product);
    this.addedItems.next(this.cartItems);
  }

}
