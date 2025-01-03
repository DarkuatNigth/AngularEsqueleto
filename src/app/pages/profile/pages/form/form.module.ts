import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, ButtonsModule, CheckboxesModule, DateRangeModule, FilesUploadModule, SelectModule } from '@app/shared';
import { FormFieldModule, InputModule, AutocompleteModule } from '@app/shared';
import { SpinnerModule } from '@app/shared';
import { UserPhotoModule } from '@app/shared';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components/stepper/stepper.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { RadiosModule } from "../../../../shared/controls/radios/radios.module";
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { MapperService } from './services';

@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    EmployeeComponent,
    RecruiterComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    ReactiveFormsModule,
    AutocompleteModule,
    FilesUploadModule,
    SpinnerModule,
    UserPhotoModule,
    RadiosModule,
    SelectModule,
    CheckboxesModule,
    DateRangeModule,
    ButtonsModule,
    ButtonModule
],
providers:[
  MapperService
]
})
export class FormModule { }
