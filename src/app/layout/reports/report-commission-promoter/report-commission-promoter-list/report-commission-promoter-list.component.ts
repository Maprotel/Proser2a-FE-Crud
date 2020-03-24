// Angular
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { ReportCommissionPromoterService } from "src/shared/services";
import {
  NotificationService,
  TranslateErrorService
} from "src/shared/services/";

// Models
import { ReportCommissionPromoterModel } from "src/shared/models";

import { faCoffee, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-report-commission-promoter-list",
  templateUrl: "./report-commission-promoter-list.component.html",
  styleUrls: ["./report-commission-promoter-list.component.scss"]
})
export class ReportCommissionPromoterListComponent implements OnInit {
  selectedList: ReportCommissionPromoterModel[];
  selectedRecord: ReportCommissionPromoterModel = new ReportCommissionPromoterModel();
  selectedRow: number;

  fullList: ReportCommissionPromoterModel[];
  findInList: string;
  listSize: number;

  faCoffee = faCoffee;
  faTrashAlt = faTrashAlt;

  constructor(
    private reportCommissionPromoterService: ReportCommissionPromoterService,
    private router: Router,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService
  ) {
    this.selectedRecord = new ReportCommissionPromoterModel();
  }

  ngOnInit(): void {
    this.onGetRecords();
    this.reportCommissionPromoterService.currentRecord.subscribe(data => {
      this.selectedRecord = data;
    });
  }

  onGetRecords() {
    this.reportCommissionPromoterService.getRecords().subscribe(
      data => {
        this.selectedList = data;
        console.log(this.selectedList);
      },
      error => {
        this.notification.showError(
          `${error.status}: ${this.translateErrorService.translateErrorNumber(
            error.status
          )}`,
          "Error de conexión"
        );
      }
    );
  }

  updateSelection(store, i) {
    this.selectedRow = i;
    this.selectedRecord = store;
    this.reportCommissionPromoterService.changeSelectedRecord(store);

    // this.reportCommissionPromoterService.currentRecord.subscribe(data => {
    //   this.selectedRecord = data;
    //   console.log("this.selectedRecord", this.selectedRecord);
    // });
  }

  unPopulateForm() {
    this.router.navigate(["/layout/store/store-detail"]);

    // let employee = new EmployeeModel()
    // this.employeeService.formData = Object.assign({}, employee);
    // this.selectedRow = Object.assign({}, employee);
  }

  /******************** */

  /// search

  onSearch(findInList) {
    // if (findInList.length > 0) {
    //   this.employeeService.list = this.search(findInList);
    // } else {
    //   this.employeeService.list = this.employeeService.fullList;
    // }
  }

  onSort(event) {
    // return event;
  }

  search(text: string): ReportCommissionPromoterModel[] {
    // return this.reportCommissionPromoterService.getRecords.filter((data: ReportCommissionPromoterModel) => {
    //   const term = text.toLowerCase();
    //   return (
    //     data.storeName.toLowerCase().includes(term) ||
    //     data.storeInCharge.toLowerCase().includes(term) ||
    //     data.storeCodeId.toLowerCase().includes(term)
    //   );
    // });
    return [new ReportCommissionPromoterModel()];
  }

  clearForm() {
    // this.employeeService.formData = new ReportCommissionPromoterModel();
  }

  // Export data

  onExportToCsv() {
    // this.csvExporter.generateCsv(this.employeeService.list);
  }

  open(name: string) {
    // this.modal = this.modalService.open(name);
  }

  onNewRecord() {
    let store: ReportCommissionPromoterModel = new ReportCommissionPromoterModel();
    console.log("xxx", store);

    this.reportCommissionPromoterService.changeSelectedRecord(store);
    this.router.navigate(["/layout/store/store-detail"]);
  }

  onEditRecord() {
    this.router.navigate(["/layout/store/store-detail"]);
  }

  onDeleteRecord() {
    // alert(`¿Desea eliminar este registro?: ${this.selectedRecord.storeName}`);
  }
}
