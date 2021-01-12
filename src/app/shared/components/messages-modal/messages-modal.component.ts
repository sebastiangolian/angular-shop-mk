
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageType } from '../../enums/message-type.enum';
import { Message } from '../../interfaces/message.interface';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagesModalComponent implements OnInit, OnDestroy {
  message!: Message;
  datetime = '';
  headerClass = '';
  headerText = '';
  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription.add(this.getMessages());
  }

  private getMessages(): Subscription {
    return this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.headerClass = this.headerClassByMessage(message);
        this.headerText = this.headerTextByMessage(message);
        this.message = message;
        if (message.datetime) { this.datetime = message.datetime; }
        this.messageService.clearMessages();
      }
    });
  }

  private headerClassByMessage(message: Message): string {
    switch (message.type) {
      case MessageType.SUCCESS:
        return 'bg-success text-light';
      case MessageType.INFO:
        return 'bg-info text-light';
      case MessageType.WARNING:
        return 'bg-warning text-dark';
      case MessageType.ERROR:
        return 'bg-danger text-light';
      default:
        return '';
    }
  }

  private headerTextByMessage(message: Message): string {
    switch (message.type) {
      case MessageType.SUCCESS:
        return 'Powodzenie';
      case MessageType.INFO:
        return 'Informacja';
      case MessageType.WARNING:
        return 'Ostrzeżenie';
      case MessageType.ERROR:
        return 'Błąd';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
