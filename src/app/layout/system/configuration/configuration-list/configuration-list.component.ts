// Angular
import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

// Vendor
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ExportToCsv } from "export-to-csv";

// Services
import { ConfigurationService } from "src/shared/services";
import {
  NotificationService,
  TranslateErrorService
} from "src/shared/services/";

// Models
import { ConfigurationModel } from "src/shared/models";

@Component({
  selector: "app-configuration-list",
  templateUrl: "./configuration-list.component.html",
  styleUrls: ["./configuration-list.component.scss"]
})
export class ConfigurationListComponent implements OnInit {
  selectedList: ConfigurationModel[];
  selectedRecord: ConfigurationModel = new ConfigurationModel();
  selectedRow: number;

  fullList: ConfigurationModel[];
  findInList: string;

  closeResult = "";

  options = {
    filename: "Configuración-Variables",
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: ["Clave", "Valor"]
  };

  csvExporter = new ExportToCsv(this.options);

  constructor(
    private modalService: NgbModal,
    private configurationService: ConfigurationService,
    private router: Router,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService
  ) {}

  ngOnInit(): void {
    this.onGetRecords();
    this.configurationService.currentRecord.subscribe(data => {
      this.selectedRecord = data;
    });
  }

  onGetRecords() {
    this.configurationService.getRecords().subscribe(
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
    console.log("record", record);

    this.selectedRow = i;
    this.selectedRecord = record;
    this.configurationService.changeSelectedRecord(record);
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

  search(text: string): ConfigurationModel[] {
    return this.fullList.filter((data: ConfigurationModel) => {
      const term = text.toLowerCase();
      return (
        data.key.toLowerCase().includes(term) ||
        data.value.toLowerCase().includes(term)
      );
    });
  }

  // Export data

  onExportToCsv() {
    this.csvExporter.generateCsv(this.fullList);
  }

  onNewRecord() {
    let record: ConfigurationModel = new ConfigurationModel();
    this.configurationService.changeSelectedRecord(record);
    this.router.navigate(["/layout/configuration/configuration-detail"]);
  }

  onEditRecord() {
    this.router.navigate(["/layout/configuration/configuration-detail"]);
  }

  onDeleteRecord(record) {
    this.configurationService.deleteRecord(record.key).subscribe(
      data => {
        if (data.count > 0) {
          let foo_object = record;
          this.selectedList = this.selectedList.filter(
            obj => obj !== foo_object
          );
          this.notification.showInfo(
            this.selectedRecord.key,
            "Variable eliminada"
          );
          this.selectedRecord = new ConfigurationModel();
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
