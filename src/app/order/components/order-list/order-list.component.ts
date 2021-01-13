import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener } from '@angular/core';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {

  closeOthers: boolean = true
  class: string = 'list-group sticky-100';
  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (window.outerHeight > window.pageYOffset + 100) {
      this.class = 'list-group sticky-100';
    }
    else {
      this.class = 'list-group sticky-20';
    }

  }
}
