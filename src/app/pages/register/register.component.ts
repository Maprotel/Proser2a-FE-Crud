// Angular
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Models
import { UserbaseModel } from "src/shared/models/Userbase.model";

// Services
import {
  UserbaseService,
  NotificationService,
  TranslateErrorService
} from "src/shared/services";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  mainForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private translateErrorService: TranslateErrorService,
    private userbaseService: UserbaseService
  ) {}

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this.mainForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      profile: [null, Validators.required],
      realm: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      user_legal_id: [null, Validators.required],
      user_internal_id: [null, Validators.required],
      user_photo_path: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.mainForm.controls;
  }

  createRecord(user: UserbaseModel) {
    this.userbaseService.postRecord(user).subscribe(
      data => {
        this.notification.showSuccess("Usuario agregado: " + data, "ProSer");
      },
      error => {
        this.notification.showError(
          this.translateErrorService.translateErrorNumber(error.status),
          "ProSer"
        );
        console.log("error", error);
      }
    );
  }

  onSubmit() {}
}
