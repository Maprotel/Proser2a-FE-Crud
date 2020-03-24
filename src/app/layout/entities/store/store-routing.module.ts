import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';


const routes: Routes = [
  {
    path: "",
    component: StoreComponent,
    children: [
      {
        path: "store-list",
        component: StoreListComponent
      },{
        path: "store-detail",
        component: StoreDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
