import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductActionsService {

  private cartItems: any[] = [];

  public addedItems = new BehaviorSubject<any>(this.cartItems);

  constructor() { }


  public addToCart(product: any) {
    this.cartItems.push(product);
    this.addedItems.next(this.cartItems);
  }

  public removeFromCart(product: any) {
    this.cartItems.splice(product);
    this.addedItems.next(this.cartItems);
  }

}
