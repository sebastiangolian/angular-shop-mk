import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogoutMessageService } from './logout-message.service';

const CHECK_INTERVALL = 1000 * 10;
const STORAGE_LAST_ACTION_KEY = 'autoLogoutLastAction';

@Injectable({ providedIn: 'root' })
export class AutoLogoutService {

  private autoLogOutTimeout = environment.autoLogOutTimeout * 60 * 100
  constructor(private userService: UserService, private ngZone: NgZone, private logoutMessageService: LogoutMessageService) {
    this.check();
    this.initListener();
    this.initInterval();
    this.logoutMessageService.send()
  }

  get lastAction(): number {
    return Number(localStorage.getItem(STORAGE_LAST_ACTION_KEY));
  }

  set lastAction(value) {
    localStorage.setItem(STORAGE_LAST_ACTION_KEY, value.toString());
  }

  initListener(): void {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => { this.check() }, CHECK_INTERVALL);
    });
  }

  isTimeout(): boolean {
    return Date.now() - this.lastAction > this.autoLogOutTimeout
  }

  reset(): void {
    this.lastAction = Date.now()
  }

  check(): void {
    this.ngZone.run(() => {
      if (this.isTimeout() && this.userService.subject.value) {
        this.userService.logoutSession()
        this.logoutMessageService.message = `Nastąpiło automatyczne wylogowanie z aplikacji po ${environment.autoLogOutTimeout} minutach.`
        location.reload();
      }
    });
  }
}
