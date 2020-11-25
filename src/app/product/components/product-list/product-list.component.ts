import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { BasketService } from 'src/app/basket/services/basket.service';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[]
  @Input() photo: Photo
  @Input() event: Event
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.updateProductsFromBasket()
  }

  onChangeAmount(product: Product, amount: number): void {
    let basketItem: BasketItem = {
      amount: amount,
      price: product.price,
      photo: this.photo,
      product: product,
      event: this.event
    }
    this.basketService.update(basketItem)
  }

  private updateProductsFromBasket(): void {
    const findBasketItems = this.basketService.items.filter(item =>
      item.photo.idPhoto == this.photo.idPhoto
    )

    findBasketItems.forEach(item => {
      let index = this.products.findIndex(product => product.idProduct == item.product.idProduct)
      if(index > -1) this.products[index].amount = item.amount
    })
    
  }
}
