import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-icon-b',
  templateUrl: './icon-b.component.html',
  styleUrls: ['./icon-b.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconBComponent implements OnInit {

  @Input() name: string;
  @Input() width: string = "22";
  @Input() height: string = "22";
  @Input() class: string = "icon-color";
  @Input() title: string = "";

  href: string = "/assets/icons/"

  constructor() { }

  ngOnInit(): void {
    this.href = this.href + this.name + ".svg"
  }
}
