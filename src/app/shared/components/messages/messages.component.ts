import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagesComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription.add(this.getMessages());
  }

  private getMessages(): Subscription {
    return this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      } else {
        this.messages = [];
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
