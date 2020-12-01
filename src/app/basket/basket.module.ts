import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketWidgetComponent } from './components/basket-widget/basket-widget.component';
import { SharedModule } from '../shared/shared.module';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketListItemComponent } from './components/basket-list-item/basket-list-item.component';
import { BasketButtonComponent } from './components/basket-button/basket-button.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketWidgetComponent,
    BasketListComponent,
    BasketListItemComponent,
    BasketButtonComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
  exports: [
    BasketWidgetComponent,
    BasketButtonComponent
  ]
})
export class BasketModule { }
