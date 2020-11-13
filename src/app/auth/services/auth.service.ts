import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Api } from '../../shared/interfaces/api.interface';
import { Token } from '../interfaces/token.interface';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { Auth } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string;
  
  url: string = environment.authEndpoint
  currentUser: Observable<User>;
  subject: BehaviorSubject<User> = new BehaviorSubject<User>(null)
  
  get token(): string { 
    const sessionToken = localStorage.getItem('token')
    if(!sessionToken)
      return this._token 
    else
      return sessionToken 
  }

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  getToken(auth: Auth): Observable<Api<Token>> {
    return this.http.post<Api<Token>>(this.url + "/login", auth).pipe(
      tap((auth:Api<Token>) => {
        this._token = auth.item.token
        localStorage.setItem('token', auth.item.token)
      })
    )
  }

  setToken(token: string) {
    this._token = token
  }

  getUser(): Observable<User> {
    return this.userService.getOne().pipe(
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
