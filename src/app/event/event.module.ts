import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './pages/event/event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { PhotoModule } from '../photo/photo.module';
import { SharedModule } from '../shared/shared.module';
import { OfferModule } from '../offer/offer.module';
import { EventPhotoListComponent } from './components/event-photo-list/event-photo-list.component';
import { EventPhotoListItemComponent } from './components/event-photo-list-item/event-photo-list-item.component';

@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    EventListItemComponent,
    EventPhotoListComponent,
    EventPhotoListItemComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    PhotoModule,
    OfferModule
  ]
})
export class EventModule { }
