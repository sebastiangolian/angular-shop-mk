import { UserType } from './../enums/user-type.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/shared/services/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {
  private localToken: string;

  currentUser: Observable<User> = new Observable<User>();
  subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  get token(): string {
    const storageToken = localStorage.getItem('token');
    if (!storageToken) {
      return this.localToken;
    }
    else {
      return storageToken;
    }
  }

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
    this.url += '/user';
  }

  getToken(user: User): Observable<null> {
    return this.http.post<null>(this.url + '/login', user);
  }

  setToken(token: string) {
    this.localToken = token;
  }

  getUser(): Observable<User> {
    return this.getOne().pipe(
      tap(user => {
        if (user) {
          this.subject.next(user);
          this.currentUser = this.subject.asObservable();
          user.isIndividual = user.type === UserType.INDIVIDUAL;
        }
      })
    );
  }

  login(): Observable<User> {
    if (this.token === undefined) { return of(null); }
    if (this.subject.value) {
      return this.subject.asObservable();
    }
    else {
      return this.getUser();
    }
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.url + '/logout');
  }

  logoutSubscription(): Subscription {
    return this.logout().subscribe({
      complete: () => {
        localStorage.clear();
        this.setToken(null);
        this.subject.next(null);
        this.currentUser = null
        this.router.navigate(['/login']);
      }
    });
  }
}
