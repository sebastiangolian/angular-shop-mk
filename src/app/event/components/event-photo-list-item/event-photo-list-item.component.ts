import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoService } from 'src/app/photo/services/photo.service';
import { environment } from 'src/environments/environment';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-photo-list-item',
  templateUrl: './event-photo-list-item.component.html',
  styleUrls: ['./event-photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPhotoListItemComponent implements OnInit {

  @Input() event: Event;
  active = false;
  constructor() { }

  ngOnInit(): void { }

}
