import { Component, OnInit } from "@angular/core";

import { HeaderService } from "src/shared/services/";

@Component({
  selector: "app-test-page",
  templateUrl: "./test-page.component.html",
  styleUrls: ["./test-page.component.scss"]
})
export class TestPageComponent implements OnInit {
  sidebarVisible: boolean = false;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.headerRecord.subscribe(data => {
      this.sidebarVisible = data;
    });
  }
}
