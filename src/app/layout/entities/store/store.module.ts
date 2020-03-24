import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Vendor
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";

// Modules
import { ComponentsModule } from "src/app/components/components.module";

// Locals
import { StoreRoutingModule } from "./store-routing.module";
import { StoreComponent } from "./store.component";
import { StoreListComponent } from "./store-list/store-list.component";
import { StoreDetailComponent } from "./store-detail/store-detail.component";


@NgModule({
  declarations: [StoreComponent, StoreListComponent, StoreDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
    ToastrModule.forRoot(),
    StoreRoutingModule
  ]
})
export class StoreModule {}
