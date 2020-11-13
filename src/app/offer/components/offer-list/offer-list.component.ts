import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListComponent implements OnInit {

  @Input() offers: Offer[]
  @Input() photo: Photo
  constructor() { }

  ngOnInit(): void {
  }

}
