import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsRestService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }

  public getProductById(productId: any): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${productId}`);
  }

}
