import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

import { isNullOrUndefined } from "util";

import { EnvService } from "./env.service";

import { Router } from "@angular/router";

import { UserbaseModel, CurrentUserModel } from "src/shared/models";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private messageSource = new BehaviorSubject<string>("Default message");
  currentMessage = this.messageSource.asObservable();

  public authenticated: BehaviorSubject<boolean>;
  public currentUser: BehaviorSubject<CurrentUserModel>;
  public tick: Subject<number>;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {
    this.authenticated = new BehaviorSubject<boolean>(false);
    this.currentUser = new BehaviorSubject<CurrentUserModel>(
      new CurrentUserModel()
    );
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  tickObservable() {
    return this.tick.asObservable();
  }

  setAuthenticationValue(): void {
    let status = false;
    let newValue = localStorage.getItem("accessToken");
    if (newValue !== null) {
      status = true;
    }
    this.authenticated.next(status);
  }

  getAuthenticationValue(): Observable<boolean> {
    let status = false;
    let newValue = localStorage.getItem("accessToken");
    if (!isNullOrUndefined(newValue)) {
      status = true;
    }
    this.authenticated.next(status);
    return this.authenticated.asObservable();
  }

  // Read user from local_store
  getCurrentUser() {
    let result = null;
    let newValue = JSON.parse(localStorage.getItem("currentUser"));
    if (!isNullOrUndefined(newValue)) {
      result = newValue;
    }
    return result;
  }

  // Login user
  loginUser(username: string, password: string): Observable<CurrentUserModel> {
    console.log("username", username, "password", password);

    const url_api = `${this.env.apiUrl}/api/Userbases/login?include=user`;
    return this.http
      .post<CurrentUserModel>(
        url_api,
        { username, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
    // this.authenticated.next(true);
  }

  // logout from backend
  logoutUser() {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    const url_api = `${this.env.apiUrl}/api/userbases/logout?access_token=${accessToken}`;
    localStorage.clear();
    console.clear();
    return this.http.post<UserbaseModel>(url_api, {
      headers: this.headers
    });
    this.authenticated.next(false);
  }

  // Check in database if user exists
  checkIfExists(user) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.apiUrl}/api/Userbases/checkIfExists`;

    return this.http
      .post<any>(url_api, user, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Check if access token is present in local store
  isAuthenticated(): boolean {
    let result = false;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      result = true;
    }
    return result;
  }

  isToken() {
    this.authenticated;
  }

  /* SETTERS ****************** */

  // Record user in local store
  setUser(user: CurrentUserModel) {
    const userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);
  }

  // Record token in local store
  setToken(token) {
    localStorage.setItem("accessToken", token);
  }

  // Read token from local_store
  // getToken() {
  //   newValue;
  // }
}
