import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'cookie-bar',
  templateUrl: './cookie-bar.component.html',
  styleUrls: ['./cookie-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CookieBarComponent implements OnInit {

  private COOKIE_KEY = 'cookie-bar';
  public visible = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    if (this.getCookieValue() !== '1') { this.visible = true; }
  }

  private getCookieValue()
  {
    return this.cookieService.get(this.COOKIE_KEY);
  }

  onClosed() {
    this.cookieService.set(this.COOKIE_KEY, '1', new Date().getDate() + 365);
  }

}
