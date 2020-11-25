import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketWidgetComponent } from './components/basket-widget/basket-widget.component';
import { SharedModule } from '../shared/shared.module';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketListItemComponent } from './components/basket-list-item/basket-list-item.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketWidgetComponent,
    BasketListComponent,
    BasketListItemComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
  exports: [
    BasketWidgetComponent
  ]
})
export class BasketModule { }
