import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoModalComponent implements OnInit {

  @Input() active: boolean = true;
  @Input() close: boolean = true;
  
  constructor() {}

  ngOnInit(): void {}

  onClick(modal): void {
    modal.hide();
  }

}
