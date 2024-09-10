import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

import { FormFieldModule,PasswordModule,InputModule } from '@app/shared';
import { ButtonModule, SpinnerModule } from '@app/shared';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    FormFieldModule,
    PasswordModule,
    InputModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class RegistrationModule { }
