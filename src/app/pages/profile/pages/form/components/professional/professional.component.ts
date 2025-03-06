import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepperService } from '../stepper/services';
import { ControlItem, Diccionarios } from '@app/store/dictionaries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared';
import { objRecruiterForm } from './roles/recruiter/recruiter.component';
import { objEmployeeForm } from './roles/employee/employee.component';
import { objExperienceForm } from './roles/employee/experience/experience.component';


export interface objFormProfessional{
  strSobre: string | null ;
  nqnRoleId: string | null ;
  strRole: objEmployeeForm | objRecruiterForm | null  ;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  @Input() objValor!: objFormProfessional | any;
  @Input() objDiccionarios!: Diccionarios ;
  @Output() objChanged = new EventEmitter<objFormProfessional>();
  objForm !: FormGroup;
  objRegex = regexErrors;
  public blContinua :boolean = false;
  private objDestroy = new Subject<any>();
  constructor(private objServiceStepper: StepperService,
    private objFb: FormBuilder,
    private objCdr: ChangeDetectorRef) {
      console.log('ProfessionalComponent',this.objDiccionarios)
  }

  ngOnInit(): void {/*
    console.log(this.objDiccionarios);
    let objControlItem : ControlItem[]= [{objValor:"2",strLabel: "Empleado",objIcon:undefined},
      {objValor:"1",strLabel: "Reclutador",objIcon:undefined}];
    this.objDiccionarios ={
      lstRol:{
          lstItem: [],
        lstControlItem: objControlItem
      },
      objEspecializacion: {
        lstItem: [],
      lstControlItem: objControlItem
    },
      lstCalificaciones: {
        lstItem: [],
      lstControlItem: []
    },
      lstHabilidades: {
        lstItem: [],
      lstControlItem: []
    },
      lstPaises: {
        lstItem: [],
      lstControlItem: []
    }
    }*/
    console.log('ngOnInit-Professional',this.objDiccionarios);
    this.objForm = this.objFb.group({
      nqnRoleId: [null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],
      strSobre: [null,{
        updateOn:'blur', validators:[
          Validators.required
        ]
      }]
    });

    if(this.objValor){
      this.objForm.patchValue(this.objValor);
    }

    this.objCdr.detectChanges();
    this.objServiceStepper.objObsCheck$.pipe(takeUntil(this.objDestroy)).subscribe((type)=>{
      //type == 'next'
      console.log(type);
      if(!this.objForm.valid)
        {
          markFormGroupTouched(this.objForm);
        this.objForm.updateValueAndValidity();
        this.objCdr.detectChanges();
        }else{
          this.objChanged.emit(this.objForm.value);
        }
        this.blContinua = this.objForm.valid ? true : false;
          this.objServiceStepper.objComplete.next(this.blContinua);
    })
  }

  ngOnDestroy(): void {
    this.objDestroy.next(null);
    this.objDestroy.complete();
  }

}
