import { User } from './../../../user/interfaces/user.interface';
import { BannerName } from './../../../banner/enums/banner-name.enum';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
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
  bannerName: BannerName = BannerName.TOP_BANNER
  user: User

  private _subscription: Subscription = new Subscription();

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router, private basketService: BasketService) {
    this._subscription.add(this.displayFooter())
    this._subscription.add(this.getUser())
  }

  onLogOut() {
    this.basketService.clear()
    this._subscription.add(this.userService.logoutSubscription())
  }

  private getUser(): Subscription {
    return this.userService.subject.asObservable().subscribe(user => {
      this.user = user
    })
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
