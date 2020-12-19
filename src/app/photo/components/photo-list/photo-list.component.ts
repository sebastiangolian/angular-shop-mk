import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';
import { Event } from '../../../event/interfaces/event.interface';

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent implements OnInit {

  @Input() photos: Photo[];
  @Input() event: Event;
  @Output() itemSelected: EventEmitter<Photo> = new EventEmitter<Photo>();
  constructor() { }

  ngOnInit(): void {}

  onItemSelected(photo: Photo) {
    this.itemSelected.emit(photo);
  }

}
