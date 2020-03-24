import { Router } from "@angular/router";
// src/app/services/interceptor.service.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { TranslateErrorService } from "./../services/system/transtale-error.service";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(private translateErrorService: TranslateErrorService) {}

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = "";
    let temp = localStorage.getItem("currentUser");
    temp ? (accessToken = JSON.parse(temp).id) : "";

    const params: HttpParams = new HttpParams().append(
      "access_token",
      `${accessToken}`
    );

    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      appName: "Cambaceros"
    });

    const clone = req.clone({
      headers: headers,
      params: params
    });

    return next.handle(clone).pipe(catchError(this.handleError));
  }
}
