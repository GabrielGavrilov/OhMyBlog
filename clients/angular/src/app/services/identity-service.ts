import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, User } from '../models/User';
import { Observable } from 'rxjs';

export function parseJWT(jwt: string) {
  try {
    return JSON.parse(atob(jwt.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function parseCookie(str: string) {
  return str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc: any, v) => {
      if (v[0] && v[1]) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      }
      return acc;
    }, {});
}

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private httpClient: HttpClient) {}

  getCookieAuthJWT() {
    return parseCookie(document.cookie)['AUTHZ'];
  }

  deleteAuthCookie() {
    document.cookie = `AUTHZ=;Max-Age=0;`;
  }

  getCookieAuthObject() {
    return parseJWT(this.getCookieAuthJWT());
  }

  getAuthHttpOptions() {
    return this.getOptions(this.getCookieAuthJWT());
  }

  getOptions(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
      withCredentials: true,
    };
  }

  isAuthenticated() {
    return !!this.getCookieAuthObject();
  }

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>('./api/v1/users');
  }

  login(user: LoginUser) {
    return this.httpClient.post('./api/v1/users/login', user, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  getAuthHttpOptionsWithParams(searchCriteria?: any) {
    const params = this.getSearchParams(searchCriteria);
    return { ...this.getOptions(this.getCookieAuthJWT()), params };
  }

  private getSearchParams(searchCriteria: any) {
    let params = new HttpParams();
    if (searchCriteria) {
      const flattenedSearchCriteria = {};
      this.flattenObject(searchCriteria, flattenedSearchCriteria);
      Object.entries(flattenedSearchCriteria)
        .filter(([_, value]) => !!value)
        .forEach(([key, value]) => (params = params.set(key, value as string)));
    }
    return params;
  }

  flattenObject(obj: any, flattenedObj: any) {
    Object.entries(obj)
      .filter(([_, value]) => value && value !== '')
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          flattenedObj[key] = value.join(', ');
        } else if (typeof value === 'object') {
          this.flattenObject(value, flattenedObj);
        } else {
          flattenedObj[key] = value;
        }
      });
  }
}
