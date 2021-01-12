import { LogService } from './../../log/services/log.service';
import { UserService } from './../../user/services/user.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageType } from 'src/app/shared/enums/message-type.enum';
import { Subscription } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private subscription: Subscription = new Subscription();
  constructor(private messageService: MessageService, private userService: UserService, private logService: LogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(environment.httpRetry),
        catchError((error: HttpErrorResponse) => {
          let message: Message;
          if (error.error instanceof ErrorEvent) {
            this.clientSideError(error.error);
          } else {
            this.serverSideError(error, request);
          }
          return throwError(message.text);
        })
      );
  }

  clientSideError(error: ErrorEvent): void {
    this.messageService.sendMessage(error.error.message, MessageType.ERROR)
  }

  serverSideError(error: HttpErrorResponse, request: HttpRequest<any>): void {
    switch (error.status) {
      case 401: {
        if (request.url.includes("/user/login")) break;
        this.messageService.sendMessage('Twoja sesja wygasła. Zaloguj się ponownie', MessageType.INFO)
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
    let login: string = null
    this.subscription.add(this.userService.subject.asObservable().subscribe(user => login = user.login));
    if (login) {
      content = `(${login})` + content
    }
    this.subscription.add(this.logService.post({ timestamp: Date.now(), type: error.url, content: content }).subscribe());
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
