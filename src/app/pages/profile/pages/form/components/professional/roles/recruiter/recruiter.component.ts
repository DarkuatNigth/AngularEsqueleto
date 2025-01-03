import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Diccionarios } from '@app/store/dictionaries';
import { objEmployeeForm } from '../employee/employee.component';
import { objExperienceForm } from '../employee/experience/experience.component';

export interface objRecruiterForm{
  strNombreEmpresa: string;
  nqnNumeroEmpleados:number;
  objExperiencia: objExperienceForm[];
}

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit, OnDestroy {

  @Input() objFormParent !: FormGroup;
  @Input() strNombre !: string;

  @Input() objValor !: objEmployeeForm | objRecruiterForm | null | undefined;
  @Input() objDiccionarios !: Diccionarios | any;

  objForm !: FormGroup;
  constructor(
    private objFb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.objForm = this.objFb.group({
      strNombreEmpresa: [null,{
            updateOn:'blur', validators:[
              Validators.required
            ]
          }],
      nqnNumeroEmpleados: [null,{
            updateOn:'blur', validators:[
              Validators.required
            ]
          }]
        });

        if(this.objValor){
          this.objForm.patchValue(this.objValor);
        }

        this.objFormParent.addControl(this.strNombre,this.objForm);
  }

  ngOnDestroy(): void {
   this.objFormParent.removeControl(this.strNombre);
  }

}
