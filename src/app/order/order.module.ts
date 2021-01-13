import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';
import { OrderElementListComponent } from './components/order-element-list/order-element-list.component';
import { OrderElementListItemComponent } from './components/order-element-list-item/order-element-list-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderListItemComponent } from './components/order-list-item/order-list-item.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderElementListComponent,
    OrderElementListItemComponent,
    OrderPaymentComponent,
    OrderListComponent,
    OrderComponent,
    OrderListItemComponent,
    OrderItemComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    AccordionModule.forRoot(),
    SharedModule
  ],
  exports: [
    OrderListComponent
  ]
})
export class OrderModule { }
