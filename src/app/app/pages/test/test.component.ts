import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.helloService.getOne().subscribe()
  }

}
