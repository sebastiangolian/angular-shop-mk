import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class UserService extends AbstractService<User> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/user"
  }
}
