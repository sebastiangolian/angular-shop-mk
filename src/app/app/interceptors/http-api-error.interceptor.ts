import { UserService } from 'src/app/user/services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { ApiMessage } from 'src/app/shared/interfaces/api-message.interface';

@Injectable()
export class HttpApiErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService, private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response != null) {
            if (response.hasOwnProperty('body')) {
              if (response.body != null) {
                if (response.body.hasOwnProperty('messages')) {
                  let messages = this.formatServerError(response.body.messages)
                  messages.forEach(message => {
                    this.messageService.sendMessage(message.text, message.type);
                  });
                }
              }
            }
          }
        })
      );
  }

  private formatServerError(apiMessage: ApiMessage): Message[] {
    const messages: Message[] = [];

    apiMessage.errors.forEach(apiError => {
      messages.push({ text: `(${apiError.code}) ${apiError.message}`, type: 'danger' });
    });

    apiMessage.notifications.forEach(apiNotification => {
      messages.push({ text: apiNotification.message, type: 'warning' });
    });

    return messages;
  }
}
