import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './pages/basket/basket.component';
import { BasketWidgetComponent } from './components/basket-widget/basket-widget.component';
import { SharedModule } from '../shared/shared.module';
import { BasketEventComponent } from './components/basket-event/basket-event.component';
import { BasketEventPhotoComponent } from './components/basket-event-photo/basket-event-photo.component';
import { BasketEventProductComponent } from './components/basket-event-product/basket-event-product.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketWidgetComponent,
    BasketEventComponent,
    BasketEventPhotoComponent,
    BasketEventProductComponent
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
