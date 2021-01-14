import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from 'src/app/user/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() user!: User;

  environments: any = environment;
  constructor() { }

  ngOnInit(): void {
  }

}
