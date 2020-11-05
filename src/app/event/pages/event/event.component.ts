import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  events: Event[];
  private _subscription: Subscription = new Subscription();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh() {
    this._subscription.add(this.getEvents())
  }

  onItemSelected(event: Event) {
    console.log(event)
  }

  private getEvents(): Subscription {
    return this.eventService.get().subscribe(ret => {
      this.events = ret.items
    })
  }

  ngOnDestroy() {
    if(this._subscription) this._subscription.unsubscribe()
  }

}
