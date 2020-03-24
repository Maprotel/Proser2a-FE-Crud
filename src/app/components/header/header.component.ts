// Angular
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { AuthService } from "src/shared/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  showSidebar: boolean = false;

  ngOnInit(): void {}

  toogleSideBar(event) {
    console.log("event", event);

    this.showSidebar = event;
    console.log("showSidebar", this.showSidebar);
  }
}
