import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  title = 'angular-shop-martynaklewinowska';

  private _subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  onLogOut() {
    this._subscription.add(this.authService.logoutSubscription())
  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }
}
