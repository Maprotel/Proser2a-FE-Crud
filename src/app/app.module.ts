// Angular
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


// Vendor
import { LanguageTranslationModule } from 'src/shared/modules/language-translation/language-translation.module'

// Shared
import { AuthGuard } from 'src/shared';


// Local
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
