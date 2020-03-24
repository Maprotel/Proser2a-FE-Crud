// Angular
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { Router } from "@angular/router";

// Vendor
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

// Services
import { EnvService } from "./env.service";

// Models
import { ConfigurationModel } from "src/shared/models";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {
  // Current user
  private currentRecordSource = new BehaviorSubject<ConfigurationModel>(
    new ConfigurationModel()
  );
  currentRecord = this.currentRecordSource.asObservable();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {}

  // Inmutable

  // Methods
  getRecords(): Observable<ConfigurationModel[]> {
    // Define api url
    const apiString = `${this.env.apiUrl}/api/Configurations`;
    // Get backend info
    return this.http
      .get<ConfigurationModel[]>(apiString, { responseType: "json" })
      .pipe(map(data => data));
  }

  getSingleRecord(id): Observable<ConfigurationModel> {
    // let id = record.PersonId;
    return this.http
      .get<ConfigurationModel>(`${this.env.apiUrl}/api/Configurations/${id}`)
      .pipe(map(data => data));
  }

  postRecord(record: ConfigurationModel): Observable<ConfigurationModel> {
    //delete record.personId
    return this.http
      .post<ConfigurationModel>(`${this.env.apiUrl}/api/Configurations`, record)
      .pipe(map(data => data));
  }

  replaceOrCreateRecord(
    record: ConfigurationModel
  ): Observable<ConfigurationModel> {
    //delete record.personId
    return this.http
      .post<ConfigurationModel>(
        `${this.env.apiUrl}/api/Configurations/replaceOrCreate`,
        record
      )
      .pipe(map(data => data));
  }

  putRecord(record: ConfigurationModel) {
    //let id = record.personId;
    //return this.http.put<ConfigurationModel>(`${this.env.apiUrl}/api/Configurations${id}`, record)
  }

  deleteRecord(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.env.apiUrl}/api/Configurations/${id}`)
      .pipe(map(data => data));
  }

  ping() {
    return this.http.get(`${this.env.apiUrl}/ping`);
  }

  /******************************** */

  // Observable variables

  changeSelectedRecord(record) {
    this.currentRecordSource.next(record);
  }
}
