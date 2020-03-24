// Angular
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

// Vendor
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map, tap, catchError, retry } from "rxjs/operators";

// Models
import { UserbaseModel } from "src/shared/models";

// Services
import { EnvService } from "../system/env.service";

@Injectable({
  providedIn: "root"
})
export class UserbaseService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getAllRecords(query?): Observable<UserbaseModel[]> {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    let filter = `?access_token=${accessToken}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.apiUrl}/api/Userbases?filter[include]=roles&access_token=${accessToken}`;
    return this.http
      .get<any>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  postRecord(item?: UserbaseModel) {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    const query = JSON.stringify(item);
    const url_api = `${this.env.apiUrl}/api/Userbases?access_token=${accessToken}`;
    return this.http
      .post<UserbaseModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  patchRecord(item?) {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    let id = null;
    if (item) {
      id = item.id;
    }
    const query = JSON.stringify(item);

    const url_api = `${this.env.apiUrl}/api/Userbases/${id}?access_token=${accessToken}`;

    return this.http
      .patch<UserbaseModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteRecord(id) {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    const url_api = `${this.env.apiUrl}$/api/Userbases/${id}?&access_token=${accessToken}`;
    return this.http.delete<UserbaseModel>(url_api, id).pipe(map(data => data));
  }

  getRecordById(id) {
    const temp = localStorage.getItem("currentUser");
    const accessToken = JSON.parse(temp).id;

    const url_api = `${this.env.apiUrl}/api/Userbases/${id}?access_token=${accessToken}`;
    return this.http.get<UserbaseModel>(url_api, id).pipe(map(data => data));
  }
}
