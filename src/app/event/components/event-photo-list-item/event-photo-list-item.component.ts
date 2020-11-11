import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-photo-list-item',
  templateUrl: './event-photo-list-item.component.html',
  styleUrls: ['./event-photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPhotoListItemComponent implements OnInit {

  @Input() event: Event
  active: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    return this.event.titlePhotoUrl;
  } 

}
