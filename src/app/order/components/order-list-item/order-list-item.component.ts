import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order;
  @Input() activeIdOrder: string;
  active = false;

  constructor() { }

  ngOnInit(): void {}

}
