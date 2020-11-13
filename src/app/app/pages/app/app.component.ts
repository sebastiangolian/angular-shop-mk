import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BasketService } from 'src/app/basket/services/basket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  title = 'angular-shop-mk';
  environments: any = environment
  init: boolean = false

  private _subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router, private basketService: BasketService) {
    this._subscription.add(this.displayFooter())
  }

  onLogOut() {
    this.basketService.clear()
    this._subscription.add(this.authService.logoutSubscription())
  }

  private displayFooter(): Subscription {
    return this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.init = false
        setTimeout(() => this.init = true, 200);
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }
}
