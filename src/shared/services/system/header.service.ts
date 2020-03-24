import { Injectable } from "@angular/core";

// Vendor
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  // Current user
  private headerRecordSource = new BehaviorSubject<boolean>(true);
  headerRecord = this.headerRecordSource.asObservable();

  constructor() {}

  // Observable variables

  changeHeaderRecord(record) {
    this.headerRecordSource.next(record);
  }
}
