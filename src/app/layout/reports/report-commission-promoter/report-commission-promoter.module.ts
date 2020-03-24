import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Vendor
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Locals
import { ReportCommissionPromoterRoutingModule } from "./report-commission-promoter-routing.module";
import { ReportCommissionPromoterComponent } from "./report-commission-promoter.component";
import { ReportCommissionPromoterListComponent } from "./report-commission-promoter-list/report-commission-promoter-list.component";

// Modules
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [
    ReportCommissionPromoterComponent,
    ReportCommissionPromoterListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    ReportCommissionPromoterRoutingModule
  ]
})
export class ReportCommissionPromoterModule {}
