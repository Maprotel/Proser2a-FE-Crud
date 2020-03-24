import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

import { isNullOrUndefined } from "util";

import { EnvService } from "./system/env.service";

import {
  CurrentUserModel,
  CurrentConfigurarationModel,
  CurrentModulesModel
} from "src/shared/models";

@Injectable({
  providedIn: "root"
})
export class Old2AuthService {
  // Current user
  private currentUserSource = new BehaviorSubject<CurrentUserModel>(
    new CurrentUserModel()
  );
  currentUser = this.currentUserSource.asObservable();

  // Current configuration
  private currentConfigurationSource = new BehaviorSubject<
    CurrentConfigurarationModel
  >(new CurrentConfigurarationModel());
  currentConfiguration = this.currentConfigurationSource.asObservable();

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  /******************************************************** */

  constructor(private http: HttpClient, private env: EnvService) {
    this.getCurrentUser();
    this.getCurrentConfiguration();
  }

  /******************************************************** */

  // Login to backend
  login(username: string, password: string) {
    const url_api = `${this.env.authenticationUrl}/api/userbases/login?include=user`;
    return this.http
      .post<CurrentUserModel>(
        url_api,
        { username, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  // logout from backend
  logout() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let accessToken = "";
    user ? (accessToken = user.id) : "";
    const url_api = `${this.env.authenticationUrl}/api/userbases/logout?access_token=${accessToken}`;
    localStorage.clear();
    console.clear();
    return this.http.post<CurrentUserModel>(url_api, {
      headers: this.headers
    });
    this.getCurrentUser();
    this.getCurrentConfiguration();
  }

  // Record user in local store
  setUserStore(user: CurrentUserModel) {
    const userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);
    this.getCurrentUser();
  }

  // Read user from local_store
  getCurrentUser(): Observable<CurrentUserModel> {
    let newValue = JSON.parse(localStorage.getItem("currentUser"));
    if (!isNullOrUndefined(newValue)) {
      this.currentUserSource.next(newValue);
    } else {
      return this.currentUser;
    }
  }

  /******************************************************** */
  // Get configutation from backend
  getConfiguration() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let accessToken = "";
    user ? (accessToken = user.id) : "";
    const url_api = `${this.env.authenticationUrl}/api/Configurations?access_token=${accessToken}`;
    return this.http
      .get<CurrentConfigurarationModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  // Set configuration in local store
  setConfigurationStore(configuration: CurrentConfigurarationModel) {
    const configurationString = JSON.stringify(configuration);
    localStorage.setItem("currentConfiguration", configurationString);
    this.getCurrentConfiguration();
  }

  getCurrentConfiguration() {
    let newValue = JSON.parse(localStorage.getItem("currentConfiguration"));
    if (!isNullOrUndefined(newValue)) {
      this.currentConfigurationSource.next(newValue);
    } else {
      return this.currentConfiguration;
    }
  }

  /******************************************************** */

  // Check if user is authenticated
  isAuthenticated() {
    let result = false;
    let newValue = this.getCurrentUser();
    if (!isNullOrUndefined(newValue)) {
      result = true;
    }
    return result;
  }

  // Get current user token from store
  getCurrentToken() {
    let result = null;
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let accessToken = "";
    user ? (accessToken = user.id) : "";
    if (!isNullOrUndefined(user)) {
      result = accessToken;
    }
    return result;
  }
}
