import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { LogoutMessageService } from './logout-message.service';

const CHECK_INTERVALL = 1000 * 10;

@Injectable({ providedIn: 'root' })
export class AutoLogoutService {
  private timeout = 0
  constructor(private userService: UserService, private ngZone: NgZone, private logoutMessageService: LogoutMessageService) {
    this.check();
    this.initInterval();
    this.logoutMessageService.send()
  }

  setTimeout(timeout: number) {
    this.timeout = timeout
  }

  initInterval(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check()
      }, CHECK_INTERVALL);
    });
  }

  isTimeout(): boolean {
    return (Date.now() > this.timeout && this.timeout > 0)
  }

  check(): void {
    this.ngZone.run(() => {
      if (this.isTimeout() && this.userService.subject.value) {
        this.userService.logoutSession()
        this.logoutMessageService.message = `Nastąpiło automatyczne wylogowanie z aplikacji po wygaśnięciu sesji.`
        location.reload();
      }
    });
  }
}
