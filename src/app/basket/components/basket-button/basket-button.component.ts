import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketSummary } from '../../interfaces/basket-summary';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-button',
  templateUrl: './basket-button.component.html',
  styleUrls: ['./basket-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketButtonComponent implements OnInit {

  @Input() class: string = ""
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>()

  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable()
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit(true)
  }

}
