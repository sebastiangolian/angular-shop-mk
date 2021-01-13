import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './order-payment-mock.component.html',
  styleUrls: ['./order-payment-mock.component.css']
})
export class OrderPaymentMockComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    if (environment.name == "dev" || environment.name == "ghpages") {
      const id = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.orderService.mock(id).pipe(map(api => api.item)).subscribe());
      setTimeout(() => { this.router.navigate(['order', id]) }, 3000);
    } else {
      this.router.navigate(['order']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
