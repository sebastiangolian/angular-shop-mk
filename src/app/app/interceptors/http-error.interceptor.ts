import { ApiMessage } from 'src/app/shared/interfaces/api-message.interface';
import { LogService } from './../../log/services/log.service';
import { UserService } from './../../user/services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/enums/message-type.enum';
import { Subscription } from 'rxjs';
import { LogoutMessageService } from 'src/app/user/services/logout-message.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private subscription: Subscription = new Subscription();
  constructor(private messageService: MessageService, private userService: UserService, private logService: LogService, private logoutMessageService: LogoutMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(environment.httpRetry),
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.error instanceof ErrorEvent) {
            this.clientSideError(errorResponse.error);
          } else {
            if (errorResponse.error === null) {
              this.serverSideError(errorResponse, request, next);
            } else {
              if (errorResponse.error.hasOwnProperty('messages')) {
                errorResponse.error.messages.forEach((apiMessage: ApiMessage) =>
                  this.messageService.sendMessage(apiMessage.message, MessageType.ERROR))
              }
            }
          }
          return throwError(errorResponse);
        })
      );
  }

  clientSideError(error: ErrorEvent): void {
    this.messageService.sendMessage(error.error.message, MessageType.ERROR)
  }

  serverSideError(error: HttpErrorResponse, request: HttpRequest<any>, response: HttpHandler): void {
    if (request.url.includes("api/log") && request.method == "POST") return;

    switch (error.status) {
      case 401: {
        if (request.url.includes("/user/login")) break;
        this.userService.logoutSession()
        this.logoutMessageService.message = 'Twoja sesja jest nieaktualna. Zaloguj się ponownie'
        location.reload()
        break;
      }
      case 403: {
        this.messageService.sendMessage('Nie masz uprawnień do tego zasobu', MessageType.WARNING)
        break;
      }
      case 404: {
        if (request.url.includes("/api/photo") && request.url.includes("/image")) break;
        this.messageService.sendMessage('Podany zasób nie istnieje', MessageType.INFO)
        break;
      }
      default: {
        this.messageService.sendMessage('Wystąpił nieoczekiwany problem. Pracujemy nad rozwiązaniem. Proszę spróbuj ponownie za chwilę.', MessageType.ERROR)
        this.sendLog(error);
        break;
      }
    }
  }

  private sendLog(error: HttpErrorResponse): void {
    let content: string = error.message
    let user: User = this.userService.subject.value
    if (user) {
      content = `(${user.login})` + content
    }
    this.subscription.add(this.logService.post({ timestamp: Date.now(), type: error.url, content: content }).subscribe());
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
