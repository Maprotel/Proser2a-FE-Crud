// Angular
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routerTransition } from "src/app/router.animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

// Venedor
import { ToastrService } from "ngx-toastr";
import { delay } from "rxjs/operators";

// Models
import { CurrentUserModel } from "src/shared/models/";

// Services
import {
NotificationService,
EnvService,
AuthService,
TranslateErrorService
} from "src/shared/services/";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: [routerTransition()]
    })
    export class LoginComponent implements OnInit {
    env;
    user;
    password;
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private notification: NotificationService,
    private envService: EnvService,
    private authService: AuthService,
    private translateErrorService: TranslateErrorService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.env = this.envService;
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    // this.router.navigate(["/"]);
    // }
    }
    
    ngOnInit(): void {
    let authenticated = this.authService.isAuthenticated();
    console.log("authenticated", authenticated);
    // if (authenticated) {
    // this.router.navigate(["/dashboard"]);
    // }
    
    this.loginForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }
    
    // convenience getter for easy access to form fields
    get f() {
    return this.loginForm.controls;
    }
    
    onLogin() {
    this.user = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    
    this.authService.loginUser(this.user, this.password).subscribe(
    user => {
    localStorage.clear();

    this.notification.showSuccess(
    "Bienvenido: " + user.user.firstname,
    "Maprotel"
    );
    this.router.navigate(["/dashboard"]);
    },
    error => {
    this.notification.showError(
    this.translateErrorService.translateErrorNumber(
    error.status
    ),
    "Maprotel"
    );
    console.log("error", error);
    }
    );
    }
    
    onLogout() {
    this.authService.logoutUser().subscribe(user => {
    this.router.navigate(["/login"]);
    localStorage.clear();
    location.reload();
    });
    }
    
    onLoggedin() {
    localStorage.setItem("isLoggedin", "true");
    }
     
    onSubmit(){
    
    this.onLogin();
    }
    } 