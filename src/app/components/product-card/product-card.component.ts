import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() public product!: Product;
  public isActionsVisible: boolean = false;
  public size: number = 250;

  constructor(private shoppingCartService: ShoppingCartService) {}

  public onAddProduct(): void {
    this.isActionsVisible = true;
    this.shoppingCartService.addProduct(this.product, this.size);
  }

  public onRemoveProduct(): void {
    this.isActionsVisible = false;
  }
}
