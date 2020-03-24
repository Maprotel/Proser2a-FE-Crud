// Angular
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Vendor
import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";

// Manin compoenent
import { AppComponent } from "./app.component";

// Modules
import { ComponentsModule } from "./components/components.module";

// Pages
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ErrorComponent } from "./pages/error/error.component";
import { RegisterComponent } from "./pages/register/register.component";

// Services
import { AuthService } from "src/shared/services";
import { InterceptorService } from "src/shared/interceptors/interceptor.service";
import { ErrorService } from "../shared/services/system/error.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TestPageComponent } from "./pages/test-page/test-page.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    NotFoundComponent,
    HomeComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
