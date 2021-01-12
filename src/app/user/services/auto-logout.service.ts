import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/enums/message-type.enum';

const CHECK_INTERVALL = 10000;
const STORE_KEY = 'lastAction';

@Injectable({ providedIn: 'root' })
export class AutoLogoutService {

  constructor(private userService: UserService, private router: Router, private ngZone: NgZone, private messageService: MessageService) {
    this.check();
    // this.initListener();
    this.initInterval();
  }

  get lastAction() {
    return Number(localStorage.getItem(STORE_KEY));
  }

  set lastAction(value) {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    });
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + environment.autoLogOutTimeout * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout && this.userService.token) {
        const message = `Nastąpiło automatyczne wylogowanie z aplikacji po ${environment.autoLogOutTimeout} minutach.`;
        this.messageService.sendMessage(message, MessageType.WARNING);
        this.userService.logoutSession()
      }
    });
  }
}
