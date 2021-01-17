import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { OrderDefinition } from '../../interfaces/order-definition.interface';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { OrderService } from '../../services/order.service';
import { tap } from 'rxjs/operators';
import { BasketSummary } from 'src/app/basket/interfaces/basket-summary';
import { Router } from '@angular/router';
import { Api } from 'src/app/shared/interfaces/api.interface';
import { OrderDefinitionService } from '../../services/order-definition.service';
import { Order } from '../../interfaces/order.interface';
import { OrderLabelData } from '../../data/order-label.data';
import { OrderLabel } from '../../interfaces/order-label.interface';

@Component({
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable();
  order$: Observable<OrderDefinition>;
  isDisabled: boolean = false;

  private orderDefinition: OrderDefinition = null;
  private confirmOrder: Order = new OrderModel();


  private subscription: Subscription = new Subscription();

  constructor(private basketService: BasketService, private orderDefinitionService: OrderDefinitionService,
    private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {

    if (this.basketService.items.length < 1) {
      this.router.navigate(['event']);
    }

    this.order$ = this.orderDefinitionService.getOne().pipe(
      tap(item => {
        this.orderDefinition = item;
        item.labels = this.fillOrderLabels(item.labels);
      })
    );
  }

  onSubmit(f: NgForm) {
    this.isDisabled = true
    this.confirmOrder.firstname = f.value.firstname;
    this.confirmOrder.lastname = f.value.lastname;
    this.confirmOrder.email = f.value.email;
    this.confirmOrder.phone = f.value.phone;
    this.confirmOrder.comment = f.value.comment;
    if (f.value.paymentMethod) {
      this.confirmOrder.paymentMethod = this.orderDefinition.paymentMethods.find(method =>
        method.idOrderPaymentMethod === f.value.paymentMethod);
    }
    if (f.value.deliveryMethod) {
      this.confirmOrder.deliveryMethod = this.orderDefinition.deliveryMethods.find(method =>
        method.idOrderDeliveryMethod === f.value.deliveryMethod);
    }
    this.confirmOrder.agreements = [];
    this.orderDefinition.agreements.forEach(agreement => {
      if (f.value.agreements[agreement.idOrderAgreement]) {
        this.confirmOrder.agreements.push(agreement);
      }
    });
    this.confirmOrder.items = this.basketService.items;
    this.subscription.add(this.postSubscription());
  }

  private postSubscription(): Subscription {
    return this.orderService.post(this.confirmOrder).subscribe({
      next: (result: Api<Order>) => {
        this.router.navigate(['order/', result.item.idOrder]);
      },
      complete: () => {
        this.basketService.clear();
      }
    })
  }

  private fillOrderLabels(labels: OrderLabel): OrderLabel {
    const returnLabel: OrderLabel = OrderLabelData;

    if (labels.firstnameLabel) { returnLabel.firstnameLabel = labels.firstnameLabel; }
    if (labels.lastnameLabel) { returnLabel.lastnameLabel = labels.lastnameLabel; }
    if (labels.phoneLabel) { returnLabel.phoneLabel = labels.phoneLabel; }
    if (labels.emailLabel) { returnLabel.emailLabel = labels.emailLabel; }
    if (labels.emailConfirmLabel) { returnLabel.emailConfirmLabel = labels.emailConfirmLabel; }
    if (labels.commentLabel) { returnLabel.commentLabel = labels.commentLabel; }
    if (labels.orderMethodLabel) { returnLabel.orderMethodLabel = labels.orderMethodLabel; }
    if (labels.paymentMethodLabel) { returnLabel.paymentMethodLabel = labels.paymentMethodLabel; }

    return returnLabel;

  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
