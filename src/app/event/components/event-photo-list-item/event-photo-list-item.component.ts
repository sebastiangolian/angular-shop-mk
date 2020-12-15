import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoService } from 'src/app/photo/services/photo.service';
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
  src$: Observable<string>
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.src$ = this.photoService.getFileFromUrl(this.event.titlePhotoUrl)
  }

  getUrl() {
    return this.event.titlePhotoUrl;
  } 

}
