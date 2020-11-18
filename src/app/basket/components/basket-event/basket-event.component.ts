import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';

@Component({
  selector: 'basket-event',
  templateUrl: './basket-event.component.html',
  styleUrls: ['./basket-event.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventComponent implements OnInit {

  @Input() event: Event
  @Input() basketItems: BasketItem[]
  @Output() basketItemDeleted: EventEmitter<BasketItem> = new EventEmitter<BasketItem>()
  basketItemsFilter: BasketItem[]

  photos: Photo[]
  constructor() { }

  ngOnInit(): void {
    this.basketItemsFilter = this.basketItems.filter((items) => items.photo.idEvent == this.event.idEvent)
    this.photos = this.getUniquePhotos()
  }

  public getUniquePhotos(): any[] {
    return this.basketItemsFilter
    .filter(
      (item, i, arr) => arr.findIndex(t => t.photo.idPhoto === item.photo.idPhoto) === i
    )
    .map((item)=> item.photo)
  }

  onBasketItemDeleted(basketItem: BasketItem) {
    this.basketItemDeleted.emit(basketItem)
  }
}
