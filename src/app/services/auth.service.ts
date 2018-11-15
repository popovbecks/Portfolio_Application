import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;
  public name: string;
  public email: string;
  public subject = new Subject<boolean>();
  public getAuthState(value: boolean, name?: string, email?: string) {
    this.isAuthenticated = value;
    this.email = email;
    this.name = name;
    return this.subject.next(value);
  }
}
