import { Router } from '@angular/router';
import { OrderPayment } from './../../interfaces/order-payment.interface';
import { environment } from './../../../../environments/environment';
import { Component, ChangeDetectionStrategy, Input, OnChanges, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { Event } from '../../../event/interfaces/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrderItemComponent implements OnChanges, OnDestroy {

  @Input() order!: Order;
  @Input() active: boolean = true;
  isDisabled: boolean = false
  events: Event[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnChanges(): void {
    if (this.order) this.events = this.filterEvent(this.order.items);
  }

  onOrderPay(order: Order): void {
    if (environment.name == "dev" || environment.name == "ghpages") {
      this.router.navigate(['order/payment-mock', order.idOrder])
    } else {
      this.subscription.add(
        this.orderService.postPayment(order.idOrder).subscribe((orderPayment: OrderPayment) => {
          if (orderPayment.operatorUrl != "") {
            window.location.href = orderPayment.operatorUrl
          }
        })
      )
    }
  }

  endProgress(orderPayment: OrderPayment): void {
    this.order.payment = orderPayment
  }

  private filterEvent(basketItems: BasketItem[]): Event[] {
    const events: Event[] = [];
    basketItems.forEach(item => {
      const isEvent = events.find(event => event.idEvent === item.event.idEvent);
      if (!isEvent) { events.push(item.event); }
    });
    return events;
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
