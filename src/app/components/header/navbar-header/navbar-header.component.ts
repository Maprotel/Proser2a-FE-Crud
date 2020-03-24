import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { HeaderService } from "src/shared/services/";

@Component({
  selector: "app-navbar-header",
  templateUrl: "./navbar-header.component.html",
  styleUrls: ["./navbar-header.component.scss"]
})
export class NavbarHeaderComponent implements OnInit {
  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter();

  sidebarVisible: boolean = false;
  toogleIcon: string = "menu-btn active";
  isCollapsed = false;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.headerRecord.subscribe(data => {
      // console.log("data", data);
      this.sidebarVisible = data;
    });
  }

  toogleSidebar() {
    this.headerService.changeHeaderRecord(!this.sidebarVisible);
    // this.sidebarVisible = !this.sidebarVisible;
    this.isCollapsed = !this.isCollapsed;
    this.showSidebar.emit(this.sidebarVisible);
    this.sidebarVisible
      ? (this.toogleIcon = "menu-btn active")
      : (this.toogleIcon = "menu-btn inactive");
  }
}
