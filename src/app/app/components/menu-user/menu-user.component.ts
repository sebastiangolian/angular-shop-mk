import { User } from './../../../user/interfaces/user.interface';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuUserComponent implements OnInit {

  @Input() user!: User;
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }

  onLogOut() {
    this.logout.emit(true);
  }

}
