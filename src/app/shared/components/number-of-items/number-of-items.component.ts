import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

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
  @Input() count: number = 0
  constructor() { }

  ngOnInit(): void {}

  onMinusClick() {
    if(this.count > 0) this.count--
  }

  onPlusClick() {
    this.count++
  }

}
