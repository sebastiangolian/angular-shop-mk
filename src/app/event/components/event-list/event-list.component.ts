import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  @Input() events: Event[]
  @Output() itemSelected: EventEmitter<Event> = new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {
  }

  onItemSelected(event: Event) {
    this.itemSelected.emit(event)
  }

}
