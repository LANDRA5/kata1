import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly myAppUrl: string = 'http://localhost:3001/';
  private readonly contextLogin: string = 'api/login/';
  private readonly methodRegister: string = 'V1/register';
  private readonly methodIngress: string = 'V1/ingress';

  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    const finalUrl = this.getUrl('register');
    return this.http.post(`${finalUrl}`, user);
  }

  login(user: User): Observable<any> {
    const finalUrl = this.getUrl('ingress');
    return this.http.post(`${finalUrl}`, user);
  }

  private getUrl(method: string): string {
    switch (method) {
      case 'register':
        return `${this.myAppUrl}${this.contextLogin}${this.methodRegister}`;
      case 'ingress':
        return `${this.myAppUrl}${this.contextLogin}${this.methodIngress}`;
      default:
        return `${this.myAppUrl}${this.contextLogin}${this.methodRegister}`;
    }
  }
}
