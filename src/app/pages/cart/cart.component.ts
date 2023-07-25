import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public addedProducts$!: Observable<any[]>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.addedProducts$ = this.shoppingCartService.addedProducts$;
  }
}
