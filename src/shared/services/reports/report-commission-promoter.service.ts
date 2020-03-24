// Angular
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

// Vendor
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map, tap, retry } from "rxjs/operators";

// Services
import { EnvService } from "../system/env.service";

// Models
import { ReportCommissionPromoterModel } from "src/shared/models";

@Injectable({
  providedIn: "root"
})
export class ReportCommissionPromoterService {
  // Current user
  private currentRecordSource = new BehaviorSubject<
    ReportCommissionPromoterModel
  >(new ReportCommissionPromoterModel());
  currentRecord = this.currentRecordSource.asObservable();

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  // Inmutable

  // Methods
  getRecords(): Observable<ReportCommissionPromoterModel[]> {
    // Define api url
    const apiString = `${this.env.apiUrl}/api/Reports/commissionByPromoterReport`;
    // Get backend info
    return this.http
      .get<ReportCommissionPromoterModel[]>(apiString, { responseType: "json" })
      .pipe(map(data => data));
  }

  getSingleRecord(id): Observable<ReportCommissionPromoterModel> {
    // let id = record.PersonId;
    return this.http
      .get<ReportCommissionPromoterModel>(
        `${this.env.apiUrl}/api/Reports/commissionByPromoterReport/${id}`
      )
      .pipe(map(data => data));
  }

  postRecord(
    record: ReportCommissionPromoterModel
  ): Observable<ReportCommissionPromoterModel> {
    //delete record.personId
    return this.http
      .post<ReportCommissionPromoterModel>(
        `${this.env.apiUrl}/api/Reports/commissionByPromoterReport`,
        record
      )
      .pipe(map(data => data));
  }

  replaceOrCreateRecord(
    record: ReportCommissionPromoterModel
  ): Observable<ReportCommissionPromoterModel> {
    //delete record.personId
    return this.http
      .post<ReportCommissionPromoterModel>(
        `${this.env.apiUrl}/api/Reports/commissionByPromoterReport/replaceOrCreate`,
        record
      )
      .pipe(map(data => data));
  }

  putRecord(record: ReportCommissionPromoterModel) {
    //let id = record.personId;
    //return this.http.put<ReportCommissionPromoterModel>(`${this.env.apiUrl}/api/Reports/commissionByPromoterReport${id}`, record)
  }

  deleteRecord(record: ReportCommissionPromoterModel) {
    //let id = record.personId;
    // return this.http.delete(`${this.env.apiUrl}/api/Reports/commissionByPromoterReport${id}`)
  }

  ping() {
    return this.http.get(`${this.env.apiUrl}/ping`);
  }

  /******************************** */

  // Observable variables

  changeSelectedRecord(record) {
    console.log("record", record);
    this.currentRecordSource.next(record);
  }
}
