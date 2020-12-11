import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders$: Observable<Order[]>
  idOrder: string = null

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.orders$ = this.getOrders()
  }

  private getOrders(): Observable<Order[]> {
    return this.orderService.get().pipe(
      map((orders: ApiList<Order>) => orders.items)
    )
  }

  onOrderSelected(order: Order) {
    this.router.navigate(['order/', order.idOrder])
  }

}
