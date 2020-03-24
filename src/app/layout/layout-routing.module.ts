import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "./entities/store/store.module";
import { LayoutComponent } from "./layout.component";
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "layout",
        pathMatch: "full"
      },
      {
        path: "layout",
        component: LayoutComponent
      },
      {
        path: "store",
        loadChildren: () =>
          import("./entities/store/store.module").then(m => m.StoreModule)
      },
      {
        path: "report-commission-promoter",
        loadChildren: () =>
          import(
            "./reports/report-commission-promoter/report-commission-promoter.module"
          ).then(m => m.ReportCommissionPromoterModule)
      },
      {
        path: "configuration",
        loadChildren: () =>
          import("./system/configuration/configuration.module").then(
            m => m.ConfigurationModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
