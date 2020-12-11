import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { OrderPaymentStatusComponent } from './components/order-payment-status/order-payment-status.component';
import { OrderElementListComponent } from './components/order-element-list/order-element-list.component';
import { OrderElementListItemComponent } from './components/order-element-list-item/order-element-list-item.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderConfirmationComponent,
    OrderElementListComponent,
    OrderElementListItemComponent,
    OrderPaymentStatusComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
  ]
})
export class OrderModule { }
