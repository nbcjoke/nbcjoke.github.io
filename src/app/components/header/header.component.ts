import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public counter = 0;
  constructor(private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.shoppingCartService.addedProductsCounter$.subscribe((counter) => {
      this.counter = counter;
    });
  }
}
