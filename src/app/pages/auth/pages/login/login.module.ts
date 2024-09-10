import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule,PasswordModule,InputModule } from '@app/shared';
import { ButtonModule, SpinnerModule } from '@app/shared';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    PasswordModule,
    InputModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class LoginModule { }
