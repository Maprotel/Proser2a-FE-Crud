import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "src/shared";

const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
            import("./layout/layout.module").then(m => m.LayoutModule),
        canActivate: [AuthGuard]
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("./layout/dashboard/dashboard.module").then(m => m.DashboardModule)
    },
    {
        path: "login",
        loadChildren: () =>
            import("./pages/login/login.module").then(m => m.LoginModule)
    },
    {
        path: "signup",
        loadChildren: () =>
            import("./pages/signup/signup.module").then(m => m.SignupModule)
    },
    {
        path: "error",
        loadChildren: () =>
            import("./pages/server-error/server-error.module").then(
                m => m.ServerErrorModule
            )
    },
    {
        path: "access-denied",
        loadChildren: () =>
            import("./pages/access-denied/access-denied.module").then(
                m => m.AccessDeniedModule
            )
    },
    {
        path: "not-found",
        loadChildren: () =>
            import("./pages/not-found/not-found.module").then(
                m => m.NotFoundModule
            )
    },
    { path: "**", redirectTo: "not-found" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
