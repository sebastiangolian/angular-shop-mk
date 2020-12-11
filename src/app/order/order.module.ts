import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { OrderPaymentStatusComponent } from './components/order-payment-status/order-payment-status.component';
import { OrderElementListComponent } from './components/order-element-list/order-element-list.component';
import { OrderElementListItemComponent } from './components/order-element-list-item/order-element-list-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderListItemComponent } from './components/order-list-item/order-list-item.component';


@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderConfirmationComponent,
    OrderElementListComponent,
    OrderElementListItemComponent,
    OrderPaymentStatusComponent,
    OrderListComponent,
    OrderComponent,
    OrderListItemComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
  ],
  exports: [
    OrderListComponent
  ]
})
export class OrderModule { }
