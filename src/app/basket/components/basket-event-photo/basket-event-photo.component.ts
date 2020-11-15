import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';

@Component({
  selector: 'basket-event-photo',
  templateUrl: './basket-event-photo.component.html',
  styleUrls: ['./basket-event-photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventPhotoComponent implements OnInit {

  @Input() photo: Photo
  @Input() basketItems: BasketItem[]
  constructor() { }

  ngOnInit(): void {
  }

}
