import { ApiMessage } from 'src/app/shared/interfaces/api-message.interface';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/enums/message-type.enum';

@Injectable()
export class HttpResponseApiMessagesInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response != null) {
            if (response.hasOwnProperty('body')) {
              if (response.body != null) {
                if (response.body.hasOwnProperty('messages')) {
                  response.body.messages.forEach((apiMessage: ApiMessage) => {
                    this.messageService.sendMessage(apiMessage.message, MessageType.WARNING)
                  });
                }
              }
            }
          }
        })
      );
  }
}
