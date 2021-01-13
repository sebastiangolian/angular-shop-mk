import { Injectable } from '@angular/core';
import { MessageType } from 'src/app/shared/enums/message-type.enum';
import { MessageService } from 'src/app/shared/services/message.service';

const STORAGE_MESSAGE_KEY = 'autoLogoutMessage';

@Injectable({ providedIn: 'root' })
export class LogoutMessageService {

  constructor(private messageService: MessageService) { }

  get message(): string {
    return localStorage.getItem(STORAGE_MESSAGE_KEY);
  }

  set message(value) {
    localStorage.setItem(STORAGE_MESSAGE_KEY, value.toString());
  }

  reset(): void {
    localStorage.removeItem(STORAGE_MESSAGE_KEY)
  }

  send(): void {
    if (this.message) {
      this.messageService.sendMessage(this.message, MessageType.INFO)
      this.reset()
    }
  }
}
