import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsRestService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // http call to get all products
  public getProducts(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }

  // http call to get a product by Id
  public getProductById(productId: any): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${productId}`);
  }

  //handle http error and navigate to error placeholder page
  public handleHttpError(error: HttpErrorResponse) {
    console.log(error);
    this.router.navigate(['/error']);
  }

}
