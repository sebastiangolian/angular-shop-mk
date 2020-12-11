import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';

@Component({
  selector: 'order-element-list-item',
  templateUrl: './order-element-list-item.component.html',
  styleUrls: ['./order-element-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderElementListItemComponent implements OnInit {

  @Input() basketItems: BasketItem[]
  @Input() photo: Photo
  constructor() { }

  ngOnInit(): void {
    this.basketItems = this.basketItems.filter(item => item.photo.idPhoto == this.photo.idPhoto)
  }
}
