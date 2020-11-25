import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';

@Component({
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  mockPayment: boolean = false
  order$: Observable<Order>
  events: Event[] = []
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const idOrder = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getById(idOrder).pipe(
      map(api => {
        this.events = this.filterEvent(api.item.items)
        return api.item
      })
    )
  }

  onOrderPay(order: Order): void {
    if(order.paymentMethod.url.includes("mock")) {
      this.mockPayment = true
      setTimeout(() => this.mockPayment = false, 3000);
    } else {

    }
   
  }

  private filterEvent(basketItems: BasketItem[]): Event[] {
    let events: Event[] = []
    basketItems.forEach(item => {
      let isEvent = events.find(event => event.idEvent == item.event.idEvent)
      if(!isEvent) events.push(item.event)
    })

    return events
  }

}
