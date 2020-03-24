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
import { EnvService } from "../system/env.service";

// Models
import { StoreModel } from "src/shared/models";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  // Current user
  private currentRecordSource = new BehaviorSubject<StoreModel>(
    new StoreModel()
  );
  currentRecord = this.currentRecordSource.asObservable();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {}

  // Inmutable

  // Methods
  getRecords(): Observable<StoreModel[]> {
    // Define api url
    const apiString = `${this.env.apiUrl}/api/Stores`;
    // Get backend info
    return this.http
      .get<StoreModel[]>(apiString, { responseType: "json" })
      .pipe(map(data => data));
  }

  getSingleRecord(id): Observable<StoreModel> {
    // let id = record.PersonId;
    return this.http
      .get<StoreModel>(`${this.env.apiUrl}/api/Stores/${id}`)
      .pipe(map(data => data));
  }

  postRecord(record: StoreModel): Observable<StoreModel> {
    //delete record.personId
    return this.http
      .post<StoreModel>(`${this.env.apiUrl}/api/Stores`, record)
      .pipe(map(data => data));
  }

  replaceOrCreateRecord(record: StoreModel): Observable<StoreModel> {
    //delete record.personId
    return this.http
      .post<StoreModel>(`${this.env.apiUrl}/api/Stores/replaceOrCreate`, record)
      .pipe(map(data => data));
  }

  putRecord(record: StoreModel) {
    //let id = record.personId;
    //return this.http.put<StoreModel>(`${this.env.apiUrl}/api/Stores${id}`, record)
  }

  deleteRecord(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.env.apiUrl}/api/Stores/${id}`)
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
