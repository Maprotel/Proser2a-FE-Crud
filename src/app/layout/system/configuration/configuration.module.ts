import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Vendor
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

// Modules
import { ComponentsModule } from "src/app/components/components.module";

// Locals
import { ConfigurationRoutingModule } from "./configuration-routing.module";
import { ConfigurationComponent } from "./configuration.component";
import { ConfigurationListComponent } from "./configuration-list/configuration-list.component";
import { ConfigurationDetailComponent } from "./configuration-detail/configuration-detail.component";

@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationListComponent,
    ConfigurationDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule {}
