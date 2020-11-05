import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './pages/event/event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';


@NgModule({
  declarations: [EventComponent, EventListComponent, EventListItemComponent],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
