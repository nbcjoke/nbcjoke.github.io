import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CartProduct, Product } from '../types/product';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private addedProductsSubject$: BehaviorSubject<CartProduct[]> =
    new BehaviorSubject<CartProduct[]>([]);

  public addedProductsCounter$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public addedProducts$: Observable<CartProduct[]> =
    this.addedProductsSubject$.asObservable();

  public get addedProducts(): CartProduct[] {
    return this.addedProductsSubject$.value;
  }

  public addProduct(product: Product, size: number, withSugar = false): void {
    const products = this.addedProductsSubject$.value;

    const addedProductIndex = products.findIndex(
      (p) => p.id === product.id && p.size === size && p.withSugar === withSugar
    );
    const addedProduct = products[addedProductIndex];
    if (addedProductIndex >= 0) {
      products.splice(addedProductIndex, 1, {
        ...addedProduct,
        qty: addedProduct.qty + 1,
      });
      this.addedProductsCounter$.next(this.addedProductsCounter$.value + 1);
    } else {
      this.addedProductsSubject$.next([
        ...this.addedProductsSubject$.value,
        { ...product, size, withSugar, qty: 1 },
      ]);
      this.addedProductsCounter$.next(this.addedProductsCounter$.value + 1);
      products.splice(addedProductIndex, 1, { ...addedProduct, qty: 1 });
    }
  }

  public removeProduct(product: Product, size: number): void {
    const products = this.addedProductsSubject$.value;
    const index = products.findIndex(
      (p) => p.id === product.id && p.size === size
    );
    if (index < 0) {
      return;
    }
    const cartProduct = products[index];
    products.splice(index, 1);
    this.addedProductsSubject$.next(products);
    this.addedProductsCounter$.next(
      this.addedProductsCounter$.value - cartProduct.qty
    );
  }

  public updateQty(product: Product, qty: number, size: number): void {
    const products = this.addedProductsSubject$.value;
    const addedProductIndex = products.findIndex(
      (p) => p.id === product.id && p.price[p.size] === product.price[size]
    );
    const addedProduct = products[addedProductIndex];
    const change = qty - addedProduct?.qty;
    this.addedProductsCounter$.next(this.addedProductsCounter$.value + change);
    if (addedProductIndex >= 0) {
      products.splice(addedProductIndex, 1, { ...addedProduct, qty });
    }
    this.addedProductsSubject$.next(products);
  }
}
