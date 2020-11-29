import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { OrderPaymentStatus } from '../../interfaces/order-payment-status.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderPaymentStatusModel } from '../../models/order-payment-status.model';
import { OrderPaymentStatusService } from '../../services/offer-status.service';

@Component({
  selector: 'order-payment-status',
  templateUrl: './order-payment-status.component.html',
  styleUrls: ['./order-payment-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPaymentStatusComponent implements OnInit {

  @Input() order: Order
  orderPaymentStatus$: Observable<OrderPaymentStatus>
  stopRequesting: Subject<boolean> = new Subject<boolean>();

  constructor(private orderPaymentStatusService: OrderPaymentStatusService) { }

  ngOnInit(): void {
    let orderPaymentStatus = new OrderPaymentStatusModel()
    orderPaymentStatus.idOrder = this.order.idOrder
    this.orderPaymentStatus$ = this.orderPaymentStatusService.getById(this.order.idOrder).pipe(
      repeatWhen(completed => completed.pipe(delay(3000))),
      map(api => api.item),
      tap(item => {if(item.isProgress == false) this.stopRequesting.next(true)}),
      takeUntil(this.stopRequesting.pipe(delay(2000)))
    )
  }

}
