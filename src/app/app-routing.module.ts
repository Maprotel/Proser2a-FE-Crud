import { TestPageComponent } from "./pages/test-page/test-page.component";
import { RegisterComponent } from "./pages/register/register.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { ErrorComponent } from "./pages/error/error.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "test-page",
        component: TestPageComponent
      },

      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then(m => m.LayoutModule)
      }
    ]
  },

  { path: "error", component: ErrorComponent },

  { path: "not-found", component: NotFoundComponent },
  // NAVIGATE TO NOT FOUND PAGE
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
