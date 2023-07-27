import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          right: '0',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          right: '-400px',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.6s')]),
    ]),
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() public product!: Product;
  public counter: number = 0;
  public size: number = 250;
  public withSugar: boolean = false;
  public isOpen = false;
  public isAdded: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.checkProductState();
  }

  public onAddProduct(): void {
    this.counter = 1;
    this.isAdded = true;
    this.shoppingCartService.addProduct(
      this.product,
      this.size,
      this.withSugar
    );
  }

  public onRemoveProduct(): void {
    this.isAdded = false;
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public closeModal() {
    this.onAddProduct();
    this.toggle();
  }

  public checkProductState() {
    const addedProducts = this.shoppingCartService.addedProducts;
    const added = addedProducts.find((product) => {
      return this.product.id === product.id && this.size === product.size;
    });
    this.counter = added?.qty || 0;
    this.isAdded = !!added;
  }

  public onCounterUpdate(change: number) {
    this.counter += change;

    if (this.counter === 0) {
      this.isAdded = false;
      this.shoppingCartService.removeProduct(this.product, this.size);
    } else {
      this.shoppingCartService.updateQty(this.product, this.counter, this.size);
    }
  }
}
