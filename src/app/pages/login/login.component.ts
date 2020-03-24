import { Router } from "@angular/router";
// Angular
import { Component, OnInit } from "@angular/core";

// Venedor
import { ToastrService } from "ngx-toastr";
import { delay } from "rxjs/operators";

// Models
import { CurrentUserModel } from "src/shared/models";

// Services
import {
  NotificationService,
  EnvService,
  AuthService,
  TranslateErrorService
} from "src/shared/services/";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  env;
  user;
  password;

  constructor(
    private toastr: ToastrService,
    private notification: NotificationService,
    private envService: EnvService,
    private authService: AuthService,
    private translateErrorService: TranslateErrorService,
    private router: Router
  ) {
    this.env = this.envService;
    // this.user = "maprotel-admin";
    // this.password = "M4pr0t3l-admin";
  }

  ngOnInit(): void {}

  onLogin() {
    this.authService.loginUser(this.user, this.password).subscribe(
      user => {
        localStorage.clear();
        this.authService.setUser(user);
        this.notification.showSuccess(
          "Bienvenido: " + user.user.firstname,
          "ProSer"
        );
        this.router.navigate(["home"]);
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

  showToasterSuccess() {
    this.notification.showSuccess(
      "Data shown successfully !!",
      "ItSolutionStuff.com"
    );
  }

  showToasterError() {
    this.notification.showError("Something is wrong", "ItSolutionStuff.com");
  }

  showToasterInfo() {
    this.notification.showInfo("This is info", "ItSolutionStuff.com");
  }

  showToasterWarning() {
    this.notification.showWarning("This is warning", "ItSolutionStuff.com");
  }
}
