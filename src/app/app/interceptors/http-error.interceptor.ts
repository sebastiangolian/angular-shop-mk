import { UserService } from 'src/app/user/services/user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { LogService } from 'src/app/log/services/log.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(private messageService: MessageService, private userService: UserService, private logService: LogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(environment.httpRetry),
        catchError((error) => {
          switch (error.status) {
            case 401: {
              this.messageService.sendMessage('Twoja sesja wygasła. Zostałeś wylogowany automatycznie.', 'info')
              this.userService.logoutSession()
              break;
            }
            case 403: {
              this.messageService.sendMessage("Nie masz uprawnień do wykonanie tego polecenia", 'warning')
              break;
            }
            case 404: {
              let showError: boolean = true
              if (request.url.includes("/api/photo") && request.url.includes("/image")) showError = false
              if (showError) this.messageService.sendMessage("Strona, której szukasz, nie istnieje", 'info')
              break;
            }
            default: {
              this.catchOther(error)
              this.sendLog(error);
              this.messageService.sendMessage("Wystąpił nieoczekiwany problem. Proszę spróbuj ponownie", 'danger')
            }
          }

          return throwError(error);
        })
      );
  }

  catchOther(error: any) {
    let messages: Message[] = [];

    if (error.error instanceof ErrorEvent) {
      messages.push({ text: error.error.message, type: 'danger' });
    } else {
      messages.push({ text: `(${error.status}) ${error.message}`, type: 'danger' });
    }

    messages.forEach(message => {
      this.messageService.sendMessage(message.text, message.type);
    });
  }

  private sendLog(error: ErrorEvent): void {
    this.subscription.add(this.logService.post({ timestamp: Date.now(), type: error.filename, content: error.message }).subscribe());
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
