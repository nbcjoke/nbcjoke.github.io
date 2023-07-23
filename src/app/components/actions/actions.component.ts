import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() public product: any;
  @Output() public productRemoved: EventEmitter<void> = new EventEmitter();
  public counter = 1;

  constructor(private shoppingCartService: ShoppingCartService) {}

  public increment(): void {
    this.counter += 1;
    this.shoppingCartService.addProduct(this.product);
  }

  public decrement(): void {
    this.counter -= 1;
    this.product.quantity = this.counter;
    this.shoppingCartService.updateQty(this.product, this.product.quantity);

    if (this.counter === 0) {
      this.shoppingCartService.removeProduct(this.product);
      this.counter = 1;
      this.productRemoved.emit();
    }
  }
}
