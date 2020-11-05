import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent implements OnInit {

  @Input() item: Event;
  @Output() itemSelected: EventEmitter<Event> = new EventEmitter<Event>();
  active: boolean = false

  constructor() { }

  ngOnInit(): void {}

  onClick() {
    this.itemSelected.emit(this.item)
  }

}
