import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { Event } from '../../../event/interfaces/event.interface';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrderItemComponent implements OnChanges {

  @Input() order: Order;
  mockPayment = false;
  events: Event[] = [];
  constructor(private orderService: OrderService) { }

  ngOnChanges(): void {
    this.events = this.filterEvent(this.order.items);
  }

  onOrderPay(order: Order): void {
    if (order.payment.operatorUrl.includes('mock')) {
      this.mockPayment = true;
      this.orderService.mock(order).pipe(map(api => api.item)).subscribe(result => this.order = result);
      setTimeout(() => {
        this.mockPayment = false;
      }, 3000);
    } else {
      window.location.href = order.payment.operatorUrl;
    }

  }

  private filterEvent(basketItems: BasketItem[]): Event[] {
    const events: Event[] = [];
    basketItems.forEach(item => {
      const isEvent = events.find(event => event.idEvent === item.event.idEvent);
      if (!isEvent) { events.push(item.event); }
    });
    return events;
  }
}
