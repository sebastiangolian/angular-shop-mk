import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketSummary } from '../../interfaces/basket-summary';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-widget',
  templateUrl: './basket-widget.component.html',
  styleUrls: ['./basket-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketWidgetComponent implements OnInit {

  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable()

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {}

}
