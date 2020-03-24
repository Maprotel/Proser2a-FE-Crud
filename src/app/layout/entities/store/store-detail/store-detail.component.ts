import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Services
import { StoreService } from "src/shared/services";
import {
  NotificationService,
  TranslateErrorService
} from "src/shared/services/";

// Models
import { StoreModel } from "src/shared/models";

@Component({
  selector: "app-store-detail",
  templateUrl: "./store-detail.component.html",
  styleUrls: ["./store-detail.component.scss"]
})
export class StoreDetailComponent implements OnInit {
  selectedRecord: StoreModel = new StoreModel();

  recordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private router: Router,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService
  ) {}

  ngOnInit(): void {
    this.storeService.currentRecord.subscribe(data => {
      this.selectedRecord = data;
    });

    this.onFillForm();
  }

  onFillForm() {
    this.recordForm = this.formBuilder.group({
      storeId: [this.selectedRecord.storeId],
      storeCodeId: [this.selectedRecord.storeCodeId, Validators.required],
      storeName: [this.selectedRecord.storeName, Validators.required],

      storeAddress: [this.selectedRecord.storeAddress, Validators.required],
      storePhone: [this.selectedRecord.storePhone, Validators.required],
      storeInCharge: [this.selectedRecord.storeInCharge, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.recordForm.controls;
  }

  onReturn() {
    this.selectedRecord = new StoreModel();
    this.storeService.changeSelectedRecord(this.selectedRecord);
    this.router.navigate(["/layout/store/store-list"]);
  }

  onSubmit() {
    this.onReplaceOrCreate();
  }

  onReplaceOrCreate() {
    this.storeService.replaceOrCreateRecord(this.recordForm.value).subscribe(
      data => {
        this.notification.showSuccess(data.storeName, "Tienda Registrada");
        this.selectedRecord = new StoreModel();
        this.storeService.changeSelectedRecord(this.selectedRecord);
        this.onFillForm();
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
}
