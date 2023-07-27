import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartProduct } from 'src/app/types/product';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent {
  @Input() public cartProduct!: CartProduct;
  constructor(public shoppingCartService: ShoppingCartService) {}

  public onUpdateCounter(change: number) {
    const counter = this.cartProduct.qty + change;

    if (counter === 0) {
      this.shoppingCartService.removeProduct(
        this.cartProduct,
        this.cartProduct.size
      );
    } else {
      this.shoppingCartService.updateQty(
        this.cartProduct,
        counter,
        this.cartProduct.size
      );
    }
  }
}
