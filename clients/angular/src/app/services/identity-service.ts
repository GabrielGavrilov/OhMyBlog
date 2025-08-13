import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private httpClient: HttpClient) {}

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:5263/api/v1/users');
  }

  login(user: LoginUser) {
    return this.httpClient.post(
      'http://localhost:5263/api/v1/users/login',
      user,
      {
        responseType: 'text',
      }
    );
  }
}
