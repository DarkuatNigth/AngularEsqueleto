import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepperService } from '../stepper/services';
import { Diccionarios } from '@app/store/dictionaries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared';

export interface objFormPersonal{
  strName?: string | null;
  strFotoUrl?: string | null;
  strCodigoPais: string | null;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {

private objDestroy = new Subject<any>();

  @Input() objValor!: objFormPersonal;
  @Input() objDiccionarios!: Diccionarios | any;

  @Output() objChanged = new EventEmitter<objFormPersonal>();

  objForm !: FormGroup;
  objRegex = regexErrors;
  public blContinua :boolean = false;

  constructor(private objServiceStepper: StepperService,
    private objFb: FormBuilder,
    private objCdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.objForm = this.objFb.group({
      strName: [null,{
        updateOn:'blur', validators:[
          Validators.required,
          Validators.maxLength(128)
        ]
      }],
      strFotoUrl: [null],
      strCodigoPais: [null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }]
    });
    if(this.objValor){
      this.objForm.patchValue(this.objValor);
    }

    this.objServiceStepper.objObsCheck$.pipe(takeUntil(this.objDestroy)).subscribe((type: any)=>{
      //type == 'next'
      if(!this.objForm.valid)
      {
        markFormGroupTouched(this.objForm);
      this.objForm.updateValueAndValidity();
      this.objCdr.detectChanges();
      }else{
        this.objChanged.emit(this.objForm.value);
      }
      this.blContinua = this.objForm.valid ? true : false;
        this.objServiceStepper.objNext.next(this.blContinua);
    })
  }

  ngOnDestroy(): void {
    this.objDestroy.next(null);
    this.objDestroy.complete();
  }

  onPhotoChanged(url: any): void{
    if(url){
      this.objForm.controls.strFotoUrl?.setValue(url);
    }
  }

}
