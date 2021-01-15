import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AutoLogoutService } from 'src/app/user/services/auto-logout.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class XExpiresAfterInterceptor implements HttpInterceptor {
  constructor(private autoLogoutService: AutoLogoutService) { }

  regenerateExpires(response) {
    if (response instanceof HttpResponseBase) {
      const { headers } = response;
      const xExpiresAfter = headers.get('X-Expires-After');
      if (xExpiresAfter) {
        let dateExpires = new Date(xExpiresAfter)
        console.log(dateExpires)
        this.autoLogoutService.setTimeout(dateExpires.getTime())
      }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(response => {
        this.regenerateExpires(response);
      }),
      catchError((error) => {
        this.regenerateExpires(error);
        return throwError(error);
      })
    );
  }
}
