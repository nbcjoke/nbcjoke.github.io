import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { products } from '../mocks/products';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private addedProductsSubject$: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  public addedProductsCounter$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public addedProducts$: Observable<any[]> =
    this.addedProductsSubject$.asObservable();

  public addProduct(product: any): void {
    this.addedProductsSubject$.next([
      ...this.addedProductsSubject$.value,
      { ...product, qty: 1 },
    ]);
    this.addedProductsCounter$.next(this.addedProductsCounter$.value + 1);
  }

  public removeProduct(product: any): void {
    this.addedProductsSubject$.next([
      ...this.addedProductsSubject$.value,
      product,
    ]);
    const products = this.addedProductsSubject$.value.filter(
      (p) => p.name !== product.name && p.price !== product.price
    );
    this.addedProductsSubject$.next(products);
    this.addedProductsCounter$.next(this.addedProductsCounter$.value - 1);
  }

  public updateQty(product: any, qty: number): void {
    const products = this.addedProductsSubject$.value;
    const addedProductIndex = products.findIndex(
      (p) => p.name === product.name && p.price === product.price
    );
    const addedProduct = products[addedProductIndex];
    console.log(addedProduct);
    const change = qty - addedProduct.qty;
    console.log(change);
    this.addedProductsCounter$.next(this.addedProductsCounter$.value + change);
    if (addedProductIndex >= 0) {
      products.splice(addedProductIndex, 1, { ...addedProduct, qty });
    }
    this.addedProductsSubject$.next(products);
  }
}
