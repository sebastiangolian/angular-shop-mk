import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  class: string = "list-group sticky-100"
  @Input() events: Event[]
  @Output() itemSelected: EventEmitter<Event> = new EventEmitter<Event>();
  constructor() { }

  ngOnInit(): void {}
  
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {	
    if (window.outerHeight > window.pageYOffset + 100) {
      this.class = "list-group sticky-100"
    }
    else {
      this.class = "list-group sticky-20"
    }
      
  }

  onItemSelected(event: Event) {
    this.itemSelected.emit(event)
  }
}
