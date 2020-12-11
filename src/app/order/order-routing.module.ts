import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'create', component: OrderCreateComponent },
  { path: ':id', component: OrderConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
