import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Services
import { ConfigurationService } from "src/shared/services";
import {
  NotificationService,
  TranslateErrorService
} from "src/shared/services/";

// Models
import { ConfigurationModel } from "src/shared/models";

@Component({
  selector: "app-configuration-detail",
  templateUrl: "./configuration-detail.component.html",
  styleUrls: ["./configuration-detail.component.scss"]
})
export class ConfigurationDetailComponent implements OnInit {
  selectedRecord: ConfigurationModel = new ConfigurationModel();

  recordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private router: Router,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService
  ) {}

  ngOnInit(): void {
    this.configurationService.currentRecord.subscribe(data => {
      this.selectedRecord = data;
    });

    this.onFillForm();
  }

  onFillForm() {
    this.recordForm = this.formBuilder.group({
      key: [this.selectedRecord.key],
      value: [this.selectedRecord.value, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.recordForm.controls;
  }

  onReturn() {
    this.selectedRecord = new ConfigurationModel();
    this.configurationService.changeSelectedRecord(this.selectedRecord);
    this.router.navigate(["/layout/configuration/configuration-list"]);
  }

  onSubmit() {
    this.onReplaceOrCreate();
  }

  onReplaceOrCreate() {
    this.configurationService
      .replaceOrCreateRecord(this.recordForm.value)
      .subscribe(
        data => {
          this.notification.showSuccess(data.key, "Variable Registrada");
          this.selectedRecord = new ConfigurationModel();
          this.configurationService.changeSelectedRecord(this.selectedRecord);
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
