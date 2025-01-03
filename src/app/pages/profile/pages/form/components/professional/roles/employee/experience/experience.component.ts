import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface objExperienceForm{
  strNombreEmpresa: string;
  objPeriodo: Periodo;
}

export interface Periodo{
  nqnDesde: number;
  nqnHasta: number;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements  OnInit, OnDestroy   {
  @Input() objFormParent !: FormGroup;
  @Input() strNombre !: string;

  @Input() public lstValor !: objExperienceForm[];

  objFormArray !: FormArray;
  constructor(
    private objFb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.lstValor = this.lstValor ? this.lstValor : [];
    this.init();
  }

  ngOnDestroy(): void {
  this.objFormParent.removeControl(this.strNombre);
  }
  private init(){
    this.objFormArray = this.objFb.array(this.getFormGroupArray(this.lstValor));
    this.objFormParent.addControl(this.strNombre,this.objFormArray);
  }

  private getFormGroupArray(objValor: objExperienceForm[]): FormGroup[]{
    if(!this.lstValor.length){
      return[this.getFormGroup()];
    }else{
      return objValor.map((valor) => this.getFormGroup(valor));
    }
  }
  private getFormGroup(data?: objExperienceForm):FormGroup{
    const group = this.objFb.group({
      strNombreEmpresa:[null,{
                  updateOn:'blur', validators:[
                    Validators.required
                  ]
                }],
      objPeriodo: [null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }]

    });
    if(data){
      group.patchValue(data);
    }
    return group;
  }

  addExperiencie():void{
    this.objFormArray.push(this.getFormGroup());
  }

  deleteExperience(nqnIndicie : number) : void{
    this.objFormArray.removeAt(nqnIndicie);
  }

  getControls(){
    return (this.objFormParent.get(this.strNombre) as FormArray).controls;
  }

  getControl(objControl: any, strNombre: string){
    return objControl.get('controls')?.get(strNombre) as FormControl;
  }
}
