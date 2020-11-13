import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { BasketService } from 'src/app/basket/services/basket.service';
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
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.updateProductsFromBasket()
  }

  onChangeAmount(product: Product, amount: number): void {
    let basketItem: BasketItem = {
      idPhoto: this.photo.idPhoto,
      idProduct: product.idProduct,
      amount: amount,
      price: product.price,
      photo: this.photo
    }
    this.basketService.update(basketItem)
  }

  private updateProductsFromBasket(): void {
    const findBasketItems = this.basketService.items.filter(item =>
      item.idPhoto == this.photo.idPhoto
    )

    findBasketItems.forEach(item => {
      let index = this.products.findIndex(product => product.idProduct == item.idProduct)
      if(index > -1) this.products[index].amount = item.amount
    })
    
  }
}
