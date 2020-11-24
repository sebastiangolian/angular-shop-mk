import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderConfirmationComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
  ]
})
export class OrderModule { }
