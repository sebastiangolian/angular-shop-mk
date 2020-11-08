import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-modal-image',
  templateUrl: './photo-modal-image.component.html',
  styleUrls: ['./photo-modal-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalImageComponent implements OnInit {

  @Input() photo: Photo
  constructor() { }

  ngOnInit(): void {
  }

}
