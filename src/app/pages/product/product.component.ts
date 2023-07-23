import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public products$!: Observable<any[]>;

  constructor(private productsApiService: ProductsApiService) {}

  public ngOnInit(): void {
    this.products$ = this.productsApiService.getProducts();
  }
}
