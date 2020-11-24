import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { Order } from '../../interfaces/order.interface';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { OrderService } from '../../services/offer.service';
import { map, tap } from 'rxjs/operators';
import { BasketSummary } from 'src/app/basket/interfaces/basket-summary';
import { Router } from '@angular/router';
import { Api } from 'src/app/shared/interfaces/api.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable()
  order$: Observable<Order>

  private defaultOrder: Order = null
  private confirmOrder: Order = new OrderModel()

  private _subscription: Subscription = new Subscription();

  constructor(private basketService: BasketService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.order$ = this.orderService.getOne().pipe(
      tap(api=> this.defaultOrder = api.item),
      map(api=>api.item)
    )
  }

  onSubmit(f:NgForm) {
    this.confirmOrder.firstname = f.value.firstname
    this.confirmOrder.lastname = f.value.lastname
    this.confirmOrder.email = f.value.email
    this.confirmOrder.phone = f.value.phone
    this.confirmOrder.comment = f.value.comment
    this.confirmOrder.paymentMethod = this.defaultOrder.paymentMethod.filter(method => method.idOrderPaymentMethod == f.value.paymentMethod)
    this.confirmOrder.agreements = []
    this.defaultOrder.agreements.forEach(agreement => {
      if(f.value.agreements[agreement.idOrderAgreement]) {
        this.confirmOrder.agreements.push(agreement)
      }
    })

    this._subscription.add(this.orderService.create(this.confirmOrder).subscribe((result: Api<Order>) => {
      this.basketService.clear()
      this.router.navigate(['order/', result.item.idOrder])
    }))
  }

  ngOnDestroy() {
    if (this._subscription) this._subscription.unsubscribe()
  }
}
