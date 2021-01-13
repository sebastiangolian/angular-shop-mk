import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderPaymentMockComponent } from './pages/order-payment-mock/order-payment-mock.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'payment-mock/:id', component: OrderPaymentMockComponent },
  { path: 'create', component: OrderCreateComponent },
  { path: ':id', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
