import { BasketService } from 'src/app/basket/services/basket.service';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from 'src/app/product/interfaces/product.interface';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer;
  @Input() photo: Photo;
  @Input() event: Event;
  offerAmountsSum: number = 0
  iconClass: string = '';

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.offerAmountsSum = this.getSumAmountByOffer(this.offer)
  }

  isOpenChange(status: boolean): void {
    if (status) {
      this.iconClass = 'rotate-180';
    } else {
      this.iconClass = 'rotate-0';
    }
  }

  onProductChange(product: Product): void {
    const productIndex: number = this.offer.products.findIndex(result => result.idProduct == product.idProduct)
    if (this.offer.products[productIndex]) {
      this.offer.products[productIndex] = product
    }

    this.offerAmountsSum = this.getSumAmountByOffer(this.offer)
  }

  getSumAmountByOffer(offer: Offer): number {
    let amount: number = 0
    offer.products.forEach((product) => {
      if (product.amount > 0) amount += product.amount
    })

    return amount
  }

}
