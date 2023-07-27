import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartProduct, Product } from 'src/app/types/product';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() public product!: Product;
  @Input() public counter = 1;
  @Output() public productRemoved: EventEmitter<void> = new EventEmitter();
  @Output() public updateCounter: EventEmitter<number> = new EventEmitter();

  constructor(private shoppingCartService: ShoppingCartService) {}

  public increment(): void {
    this.updateCounter.emit(1);
  }

  public decrement(): void {
    this.updateCounter.emit(-1);
  }
}
