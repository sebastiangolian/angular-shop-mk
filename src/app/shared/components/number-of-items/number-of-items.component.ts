import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'number-of-items',
  templateUrl: './number-of-items.component.html',
  styleUrls: ['./number-of-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberOfItemsComponent implements OnInit {

  @Input() width: string = "16";
  @Input() height: string = "16";
  @Input() fontSize: string = "12";
  @Input() amount: number = 0

  @Output() plusClicked: EventEmitter<number> = new EventEmitter<number>()
  @Output() minusClicked: EventEmitter<number> = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
    if(this.amount == null || this.amount == undefined) {
      this.amount = 0
    }
  }

  onMinusClick() {
    if(this.amount > 0) this.amount--
    this.plusClicked.emit(this.amount)
  }

  onPlusClick() {
    this.amount++
    this.plusClicked.emit(this.amount)
  }
}
