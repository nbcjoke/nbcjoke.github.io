import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartProduct } from 'src/app/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cartProducts$!: Observable<CartProduct[]>;
  public deliveryCost = 5;
  public total = 0;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.cartProducts$ = this.shoppingCartService.addedProducts$;
    this.cartProducts$
      .pipe(
        takeUntil(this.destroy$),
        tap((products) => {
          this.total = products.reduce((result, product) => {
            const price = product.price[product.size] * product.qty;
            return result + price;
          }, this.deliveryCost);
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
