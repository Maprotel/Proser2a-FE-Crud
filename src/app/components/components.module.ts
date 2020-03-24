import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';

// Components
import { HeaderComponent } from "./header/header.component";
import { NavbarHeaderComponent } from "./header/navbar-header/navbar-header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LogoutComponent } from "./header/logout/logout.component";

// Vendor
import { CollapseModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarHeaderComponent,
    SidebarComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    ComponentsRoutingModule
  ],
  exports: [
    HeaderComponent,
    NavbarHeaderComponent,
    SidebarComponent,
    LogoutComponent
  ]
})
export class ComponentsModule { }
