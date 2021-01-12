import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'messages-alert',
  templateUrl: './messages-alert.component.html',
  styleUrls: ['./messages-alert.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagesAlertComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
