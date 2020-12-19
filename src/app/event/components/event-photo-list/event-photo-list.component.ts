import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'event-photo-list',
  templateUrl: './event-photo-list.component.html',
  styleUrls: ['./event-photo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPhotoListComponent implements OnInit {

  @Input() events: Event[];

  constructor() { }

  ngOnInit(): void {
  }

}
