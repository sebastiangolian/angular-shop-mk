import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { OrderListItemComponent } from './components/order-list-item/order-list-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPaymentStatusComponent } from './components/order-payment-status/order-payment-status.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderConfirmationComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderPaymentStatusComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
  ]
})
export class OrderModule { }
