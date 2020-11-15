import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from '../../interfaces/basket-item.interface';

@Component({
  selector: 'basket-event-product',
  templateUrl: './basket-event-product.component.html',
  styleUrls: ['./basket-event-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventProductComponent implements OnInit {

  @Input() basketItem: BasketItem
  constructor() { }

  ngOnInit(): void {
  }

}
