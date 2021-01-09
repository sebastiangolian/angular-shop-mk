import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { OrderPayment } from '../../interfaces/order-payment.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPaymentComponent implements OnChanges {

  @Input() order: Order;
  @Output() endProgres: EventEmitter<OrderPayment> = new EventEmitter();
  orderPayment$: Observable<OrderPayment>;
  stopRequesting: Subject<boolean> = new Subject<boolean>();

  constructor(private orderService: OrderService) { }

  ngOnChanges(): void {
    this.orderPayment$ = this.orderService.getPayment(this.order.idOrder).pipe(
      repeatWhen(completed => completed.pipe(delay(3000))),
      tap(item => {
        if (item.isProgress === false) {
          this.stopRequesting.next(true);
          this.endProgres.emit(item)
        }
      }),
      takeUntil(this.stopRequesting.pipe(delay(2000)))
    );
  }

}
