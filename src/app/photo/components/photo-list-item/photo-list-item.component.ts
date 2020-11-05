import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-list-item',
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListItemComponent implements OnInit {

  @Input() item: Photo;
  @Output() itemSelected: EventEmitter<Photo> = new EventEmitter<Photo>();
  active: boolean = false

  constructor() { }

  ngOnInit(): void {}

  onClick() {
    this.itemSelected.emit(this.item)
  }


}
