import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCommissionPromoterComponent } from './report-commission-promoter.component';
import { ReportCommissionPromoterListComponent } from './report-commission-promoter-list/report-commission-promoter-list.component';


const routes: Routes = [
  {
    path: "",
    component: ReportCommissionPromoterComponent,
    children: [
      {
        path: "report-commission-promoter-list",
        component: ReportCommissionPromoterListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCommissionPromoterRoutingModule { }
