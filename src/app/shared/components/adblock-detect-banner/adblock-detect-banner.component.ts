import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'adblock-detect-banner',
  templateUrl: './adblock-detect-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdblockDetectBannerComponent implements OnInit {

  @Input() isView: boolean;
  constructor() { }

  ngOnInit(): void {}

}
