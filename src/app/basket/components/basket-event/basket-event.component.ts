import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from 'src/app/event/interfaces/event.interface';
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
  constructor() { }

  ngOnInit(): void {}

  public getPhotos(): any[] {
    return this.basketItems.filter(
      (item, i, arr) => arr.findIndex(t => t.photo.idPhoto === item.photo.idPhoto) === i
    ).map((item)=> item.photo);
  }

}
