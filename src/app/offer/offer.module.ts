import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../product/product.module';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferListItemComponent } from './components/offer-list-item/offer-list-item.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OfferListComponent,
    OfferListItemComponent
  ],
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    AccordionModule.forRoot(),
  ],
  exports: [
    OfferListComponent
  ]
})
export class OfferModule { }
