import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListComponent implements OnInit {

  @Input() offers: Offer[]
  constructor() { }

  ngOnInit(): void {
  }

}
