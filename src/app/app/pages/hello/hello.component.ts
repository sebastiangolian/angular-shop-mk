import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  constructor(private helloService: HelloService) { }

  ngOnInit(): void { }

  on200(): void {
    this.subscription.add(this.helloService.getByName("200").subscribe())
  }

  on404(): void {
    this.subscription.add(this.helloService.getByName("404").subscribe())
  }

}
