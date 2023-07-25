import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsApiService } from 'src/app/services/products-api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<Product[]>;

  constructor(private productsApiService: ProductsApiService) {}

  public ngOnInit(): void {
    this.products$ = this.productsApiService.getProducts();
  }
}
