import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { ApiMessage } from 'src/app/shared/interfaces/api-message.interface';
import { LogService } from 'src/app/log/services/log.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor, OnDestroy {

  private _subscription: Subscription = new Subscription();
  
  constructor(private messageService: MessageService, private logService: LogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(environment.httpRetry),
        catchError((error) => {
          let messages: Message[] = [];

          if (error.error instanceof ErrorEvent) {
            this.sendLog(error.error)
            messages.push(this.clientSideError(error.error));
          } else {
            if (error.errors) {
              messages.push(...this.serverSideError(error))
            }
          }
         
          messages.forEach(message => {
            this.messageService.sendMessage(message.text, message.type)
          })

          if(messages)
            return throwError(messages[0].text)
          else 
            return throwError('Wystąpił nieoczekiwany błąd w działaniu aplikacji')
        })
      )
  }

  clientSideError(error: ErrorEvent): Message {
    return { text: error.error.message, type: "danger" }
  }

  serverSideError(apiMessage: ApiMessage): Message[] {
    let messages: Message[] = []

    apiMessage.errors.forEach(apiError => {
      messages.push({ text: `(${apiError.code}) ${apiError.message}`, type: "danger" })
    })

    apiMessage.notifications.forEach(apiNotification => {
      messages.push({ text: apiNotification.message, type: "warning" })
    })

    return messages
  }

  private sendLog(error: ErrorEvent): void {
    this._subscription.add(this.logService.post({"timestamp": Date.now(), "type": error.filename, "content": error.message}).subscribe())
  }

  ngOnDestroy() {
		if (this._subscription) this._subscription.unsubscribe()
	}
}
