import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private userId:string;
  private isUserAuthenticated: boolean = false;

  public authStatusListener = new Subject<string>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getuserId(){
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string) {
    const user: User = {
      name: name,
      email: email,
      password: password
    };
    this.httpClient.post<{ message: string, result: any }>("http://localhost:15000/api/user/signup", user).subscribe(
      result => {
        console.log(result.message);
        console.log(result.result);
      }
    );
    this.router.navigate(["/"]);
  }
  login(email: string, password: string) {
    const user: User = {
      name: null,
      email: email,
      password: password
    };
    this.httpClient.post<{token:string,expiresIn:string,userId:string}>("http://localhost:15000/api/user/login", user).subscribe(
      result => {
        // console.log("login UserId"+result.userId);
        // console.log("login token"+result.token);
        this.token = result.token;
        this.userId=result.userId;
        console.log("at the tiem of login in auth service userId"+this.userId);
        this.isUserAuthenticated = true;
        this.authStatusListener.next(this.userId);
      });
      this.router.navigate(["/"]);
    }
}
