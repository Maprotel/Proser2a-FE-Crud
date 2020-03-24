import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ConfigurationComponent } from "./configuration.component";
import { ConfigurationListComponent } from "./configuration-list/configuration-list.component";
import { ConfigurationDetailComponent } from "./configuration-detail/configuration-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ConfigurationComponent,
    children: [
      {
        path: "configuration-list",
        component: ConfigurationListComponent
      },
      {
        path: "configuration-detail",
        component: ConfigurationDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
