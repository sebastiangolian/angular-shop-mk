import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';

@Component({
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  order$: Observable<Order>
  events: Event[]
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const idOrder = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getById(idOrder).pipe(
      map(api => {
        // api.item.items.forEach(item => {
        //   this.events.push(item.product.)
        // })
        return api.item
      })
    )
  }

}
