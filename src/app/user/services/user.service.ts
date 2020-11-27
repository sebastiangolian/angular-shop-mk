import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Api } from '../../shared/interfaces/api.interface';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/shared/services/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {
  private _token: string;
  
  currentUser: Observable<User>;
  subject: BehaviorSubject<User> = new BehaviorSubject<User>(null)
  
  get token(): string { 
    const sessionToken = localStorage.getItem('token')
    if(!sessionToken)
      return this._token 
    else
      return sessionToken 
  }

  constructor(protected http: HttpClient, private router: Router) {
    super(http) 
    this.url += "/user"
  }

  getToken(user: User): Observable<Api<User>> {
    return this.http.post<Api<User>>(this.url + "/login", user).pipe(
      tap((user:Api<User>) => {
        this._token = user.item.token
        localStorage.setItem('token', user.item.token)
      })
    )
  }

  setToken(token: string) {
    this._token = token
  }

  getUser(): Observable<User> {
    return this.getOne().pipe(
      map(user => {
        if(user.item) {
          this.subject.next(user.item);
          this.currentUser = this.subject.asObservable();
          return user.item;
        } 
      })
    );
  }

  login(): Observable<User> {
    if(this.token === undefined) return of(null)
    if(this.subject.value) 
      return this.subject.asObservable();
    else 
      return this.getUser()
  }

  logout(): Observable<any>{
    return this.http.get<any>(this.url + "/logout")
  }

  logoutSubscription(): Subscription {
    return this.logout().subscribe({
      complete: () => {
        localStorage.clear();
        this.setToken(null)
        this.subject.next(null);
        this.router.navigate(['/login']); 
      }
    })
  }
}
