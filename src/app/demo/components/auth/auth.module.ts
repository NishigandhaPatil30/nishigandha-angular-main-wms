
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { DialogModule } from 'primeng/dialog';
@NgModule({
    imports: [
      DialogModule,
      RecaptchaModule,
      MessageModule,
      FileUploadModule,
      AvatarModule,
      ReactiveFormsModule,
      AutoCompleteModule,
      ToastModule,
      CalendarModule,
        CommonModule,
        AuthRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        DropdownModule
    ],
    declarations: [
      RegistrationComponent,
      ForgotpasswordComponent
    ]
})
export class AuthModule { }
