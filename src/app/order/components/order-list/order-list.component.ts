import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../services/offer.service';
import { Order } from '../../interfaces/order.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {

  $orders: Observable<Order[]>
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.$orders = this.orderService.get().pipe(
      map(api=> api.items)
    )
  }

}
