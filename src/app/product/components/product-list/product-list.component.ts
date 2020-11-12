import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { BasketService } from 'src/app/basket/services/basket.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[]
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  onChangeAmount(product: Product, amount: number): void {
    let basketItem: BasketItem = {
      idProduct: product.idProduct,
      amount: amount,
      price: product.price
    }
    this.basketService.update(basketItem)
  }
}
