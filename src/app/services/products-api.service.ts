import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { products } from '../mocks/products';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  public getProducts(): Observable<any[]> {
    return of(products);
  }
}
