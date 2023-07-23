import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() public product: any;
  public isActionsVisible: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  public onAddProduct(): void {
    this.isActionsVisible = true;
    this.shoppingCartService.addProduct(this.product);
  }

  public onRemoveProduct(): void {
    this.isActionsVisible = false;
  }
}
