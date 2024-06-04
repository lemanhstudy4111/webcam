import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  myUrl = 'http://localhost:3000/api/';
  LOGIN_URL = this.myUrl + 'sign-in';
  SIGNUP_URL = this.myUrl + 'sign-up';
  GET_TOKEN_URL = this.myUrl + 'get-token';
  constructor(private http: HttpClient) {}

  addUserObj(userInfo: FormGroup) {
    const userInfoObj = new FormData();
    userInfoObj.append('email', userInfo.controls['email'].value);
    userInfoObj.append('password', userInfo.controls['password'].value);
    return userInfoObj;
  }

  loginClick(loginInfo: FormGroup) {
    //best practice is to not subscribe in service
    const loginObj = this.addUserObj(loginInfo);
    return this.http.post<any>(this.LOGIN_URL, loginObj);
  }

  signupClick(signupInfo: FormGroup) {
    const signupObj = this.addUserObj(signupInfo);
    return this.http.post<any>(this.SIGNUP_URL, signupObj);
  }

  isLoggedIn() {
    return this.http.get<any>(this.GET_TOKEN_URL);
  }
}
