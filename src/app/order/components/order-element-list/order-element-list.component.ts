import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';

@Component({
  selector: 'order-element-list',
  templateUrl: './order-element-list.component.html',
  styleUrls: ['./order-element-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderElementListComponent implements OnInit {

  @Input() event: Event
  @Input() basketItems: BasketItem[]
  photos: Photo[] = []
  constructor() { }

  ngOnInit(): void {
    this.basketItems = this.basketItems.filter(item => item.event.idEvent == this.event.idEvent)
    this.photos = this.filterPhotos(this.basketItems)
  }

  private filterPhotos(basketItems: BasketItem[]): Photo[] {
    let photos: Photo[] = []
    basketItems.forEach(item => {
      let isPhoto = photos.find(photo => photo.idPhoto == item.photo.idPhoto)
      if(!isPhoto) photos.push(item.photo)
    })

    return photos
  }

}
