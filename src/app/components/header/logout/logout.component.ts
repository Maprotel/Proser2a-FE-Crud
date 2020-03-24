import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { AuthService } from "src/shared/services";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logoutUser().subscribe(user => {
      console.log("user", user);
      this.router.navigate(["login"]);
    });
  }
}
