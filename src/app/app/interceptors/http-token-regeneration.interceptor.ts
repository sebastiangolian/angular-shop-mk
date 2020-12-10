import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HttpTokenRegenerationInterceptor implements HttpInterceptor {

  //constructor(private autoLogoutService: AutoLogoutService) { }
  constructor() { }

  getToken(headerValue: string): string {
    if (headerValue) {
      return headerValue.replace("Bearer ", "")
    } else {
      return headerValue
    }
  }

  regenerateToken(response) {
    if (response instanceof HttpResponseBase) {
      const { headers } = response;
      //this.autoLogoutService.reset()
      const autorizationValue = headers.get('Authorization')
      if (autorizationValue) {
        localStorage.setItem('token', this.getToken(autorizationValue))
      }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(response => {
        this.regenerateToken(response)
      }),
      catchError((error) => {
        this.regenerateToken(error)
        return throwError(error);
      })
    );
  }
}
