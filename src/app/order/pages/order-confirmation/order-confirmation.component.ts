import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';

@Component({
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  order$: Observable<Order>
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    const idOrder = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getById(idOrder).pipe(map(api => api.item))
  }

}
