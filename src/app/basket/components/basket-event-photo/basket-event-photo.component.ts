import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from 'src/app/product/interfaces/product.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-event-photo',
  templateUrl: './basket-event-photo.component.html',
  styleUrls: ['./basket-event-photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventPhotoComponent implements OnInit {

  @Input() photo: Photo
  @Input() basketItems: BasketItem[]
  basketItemsByPhoto: BasketItem[]
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItemsByPhoto = this.basketItems.filter(item => item.photo.idPhoto == this.photo.idPhoto)
  }

  onChangeAmount(product: Product, amount: number): void {
    let basketItem: BasketItem = {
      amount: amount,
      price: product.price,
      photo: this.photo,
      product: product
    }
    this.basketService.update(basketItem)
  }

}
