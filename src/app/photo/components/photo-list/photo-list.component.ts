import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent implements OnInit {

  @Input() photos: Photo[]
  constructor() { }

  ngOnInit(): void {
  }

}
