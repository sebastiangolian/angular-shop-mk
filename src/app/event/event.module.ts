import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './pages/event/event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
  declarations: [EventComponent, EventListComponent, EventListItemComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    PhotoModule
  ]
})
export class EventModule { }
