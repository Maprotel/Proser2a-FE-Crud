// Angular
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

// Vendor
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ExportToCsv } from "export-to-csv";

// Services
import { StoreService } from "src/shared/services";
import {
  NotificationService,
  TranslateErrorService
} from "src/shared/services/";

// Models
import { StoreModel } from "src/shared/models";

@Component({
  selector: "app-store-list",
  templateUrl: "./store-list.component.html",
  styleUrls: ["./store-list.component.scss"]
})
export class StoreListComponent implements OnInit {
  selectedList: StoreModel[];
  selectedRecord: StoreModel = new StoreModel();
  selectedRow: number;

  fullList: StoreModel[];
  findInList: string;

  closeResult = "";

  options = {
    filename: "Tiendas",
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: ["Id", "Codigo", "Nombre", "Direccion", "Telefono", "Encargado"]
  };

  csvExporter = new ExportToCsv(this.options);

  constructor(
    private modalService: NgbModal,
    private storeService: StoreService,
    private router: Router,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService
  ) {
    // this.selectedRecord = new StoreModel();
  }

  ngOnInit(): void {
    this.onGetRecords();
    this.storeService.currentRecord.subscribe(data => {
      this.selectedRecord = data;
    });
  }

  onGetRecords() {
    this.storeService.getRecords().subscribe(
      data => {
        this.selectedList = data;
        this.fullList = data;
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

  updateSelection(record, i) {
    this.selectedRow = i;
    this.selectedRecord = record;
    this.storeService.changeSelectedRecord(record);
  }

  /******************** */

  /// search

  onSearch(findInList) {
    if (findInList.length > 0) {
      this.selectedList = this.search(findInList);
    } else {
      this.selectedList = this.fullList;
    }
  }

  onSort(event) {
    // return event;
  }

  search(text: string): StoreModel[] {
    return this.fullList.filter((data: StoreModel) => {
      const term = text.toLowerCase();
      return (
        data.storeCodeId.toLowerCase().includes(term) ||
        data.storeName.toLowerCase().includes(term) ||
        data.storeAddress.toLowerCase().includes(term) ||
        data.storeInCharge.toLowerCase().includes(term) ||
        data.storePhone.toLowerCase().includes(term)
      );
    });
  }

  // Export data

  onExportToCsv() {
    this.csvExporter.generateCsv(this.fullList);
  }

  onNewRecord() {
    let record: StoreModel = new StoreModel();
    this.storeService.changeSelectedRecord(record);
    this.router.navigate(["/layout/store/store-detail"]);
  }

  onEditRecord() {
    this.router.navigate(["/layout/store/store-detail"]);
  }

  onDeleteRecord(record) {
    this.storeService.deleteRecord(record.storeId).subscribe(
      data => {
        if (data.count > 0) {
          let foo_object = record;
          this.selectedList = this.selectedList.filter(
            obj => obj !== foo_object
          );
          this.notification.showInfo(
            this.selectedRecord.storeName,
            "Tienda Eliminada"
          );
          this.selectedRecord = new StoreModel();
          this.selectedRow = null;
        }
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
    this.modalService.dismissAll(
      `Dismissed ${this.getDismissReason("Deleted record")}`
    );
  }

  /**************************** */
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
