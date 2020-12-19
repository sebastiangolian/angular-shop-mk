import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'icon-b',
  templateUrl: './icon-b.component.html',
  styleUrls: ['./icon-b.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconBComponent implements OnInit {

  @Input() name: string;
  @Input() width = '22';
  @Input() height = '22';
  @Input() classIcon = '';
  @Input() title = '';

  href = 'assets/icons/';

  constructor() { }

  ngOnInit(): void {
    this.href = this.href + this.name + '.svg';
  }
}
