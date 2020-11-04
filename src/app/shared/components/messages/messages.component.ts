import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagesComponent implements OnInit {

  messages: Message[] = []
  private _subscription: Subscription = new Subscription();
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this._subscription.add(this.getMessages())
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
    this._subscription.unsubscribe()
  }

}
