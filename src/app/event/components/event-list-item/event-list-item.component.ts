import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItemComponent implements OnInit {

  @Input() event: Event;
  @Input() activeIdEvent: string = null
  active: boolean = false

  constructor() { }

  ngOnInit(): void {}
}
