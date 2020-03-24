// Angular
import { Component, OnInit } from "@angular/core";

// Models
import { CurrentUserModel } from "src/shared/models/Auth-models.model";

// Services
import { AuthService } from "src/shared/services";
import { HeaderService } from "src/shared/services/";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  currentUser: CurrentUserModel = new CurrentUserModel();
  user: CurrentUserModel = null;

  isCollapsedEntities: boolean = true;
  isCollapsedReports: boolean = true;

  constructor(
    private authService: AuthService,
    private headerService: HeaderService
  ) {
    let temp = this.authService.getCurrentUser();
    temp ? (this.currentUser = temp) : (this.currentUser = this.user);
  }

  ngOnInit(): void {
    // console.log("this.currentUser", this.currentUser);
  }

  toogleEntities() {
    this.isCollapsedEntities = !this.isCollapsedEntities;
  }

  toogleReports() {
    this.isCollapsedReports = !this.isCollapsedReports;
  }
}
