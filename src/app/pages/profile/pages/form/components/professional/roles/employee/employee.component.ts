import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem, Diccionarios } from '@app/store/dictionaries';
import { objRecruiterForm } from '../recruiter/recruiter.component';
import { objExperienceForm } from './experience/experience.component';
import { ControlEntities, mapControls } from '@app/shared';

export interface objEmployeeForm{
  strEspecializacion: string | null;
  lstHabilidades:string[];
  strCualificacion : string;
  nqnSalarioEsperado: number;
  objExperiencia: objExperienceForm[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy  {


  @Input() objFormParent !: FormGroup;
  @Input() strNombre !: string;

  @Input() objValor !: objEmployeeForm | objRecruiterForm  ;
  @Input() objDiccionarios !: Diccionarios ;

  objForm !: FormGroup;
  objControls !: ControlEntities;
  constructor(
    private objFb: FormBuilder
  ) { }

  ngOnInit(): void {/*
    let objContItemEspecializacion : ControlItem[]=[
        {objValor:"1",strLabel: "Front End",objIcon:undefined},
        {objValor:"2",strLabel: "Back End",objIcon:undefined},
        {objValor:"3",strLabel: "Mobile",objIcon:undefined}];
    let objContItemCalificacion: ControlItem[]= [
          {objValor:"1",strLabel: "Junior",objIcon:undefined},
          {objValor:"2",strLabel: "Semi Senior",objIcon:undefined},
          {objValor:"3",strLabel: "Senior",objIcon:undefined},
          {objValor:"4",strLabel: "Lider",objIcon:undefined}
        ];
    let objContItemHabilidades : ControlItem[]=[
      {objValor:"Python",strLabel: "Python",objIcon:undefined},
      {objValor: ".Net Core",strLabel: ".Net Core",objIcon:undefined},
      {objValor:"Java",strLabel: "Java",objIcon:undefined},
      {objValor:"FireBase",strLabel: "FireBase",objIcon:undefined},
      {objValor:"Angular",strLabel: "Angular",objIcon:undefined}
    ];
    this.objDiccionarios ={
      lstRol:null,
      objEspecializacion:{
        lstItem: [],
        lstControlItem: objContItemEspecializacion
      },
      lstCalificaciones:{
        lstItem: [],
        lstControlItem: objContItemCalificacion
      },
      lstHabilidades: {
        lstItem: [],
        lstControlItem: objContItemHabilidades
      },
      lstPaises: null
    }*/
    this.objForm = this.objFb.group({
      nqnSalarioEsperado: [null,{
            updateOn:'blur', validators:[
              Validators.required
            ]
          }],
          strCualificacion: [{value: null, disabled: true},{
                updateOn:'change', validators:[
                  Validators.required
                ]
              }],
      strEspecializacion: [null,{
            updateOn:'change', validators:[
              Validators.required
            ]
          }],
          lstHabilidades: [{value: null, disabled: true},{
            updateOn:'change', validators:[
              Validators.required
            ]
          }]
        });

        this.objControls = {
          objEspecializacion:{
            lstItem: this.objDiccionarios?.objEspecializacion.lstControlItem,
            objChanged:()=>{
              console.log('entra');
               this.objControls.lstCalificaciones.objMap();
               this.objControls.lstHabilidades.objMap();
            }
          },
          lstCalificaciones:{
            lstItem: this.objDiccionarios?.lstCalificaciones.lstControlItem,
            objMap:()=>{
              if(this.objForm.value.strEspecializacion){
                 this.objForm.controls.strCualificacion.enable();
              }else{
                this.objForm.controls.strCualificacion.reset();
                this.objForm.controls.strCualificacion.disable();
              }
            }},
          lstHabilidades:{
            lstItem: this.objDiccionarios?.lstHabilidades.lstControlItem,
            objMap:()=>{
              if(this.objForm.value.strEspecializacion){
                 this.objForm.controls.lstHabilidades.enable();
                 const lstItems = [...this.objDiccionarios?.lstHabilidades.lstControlItem || []]
                 .map(
                  (objItem, index) => ({
                    ...objItem, strLabel: `${objItem.strLabel} (${index +1})`
                  })
                 );
                 this.objControls.lstHabilidades.lstItem= lstItems;
              }else{
                this.objForm.controls.lstHabilidades.reset();
                this.objForm.controls.lstHabilidades.disable();
              }
            }}
        }
        if(this.objValor){
          this.objForm.patchValue(this.objValor);
        }
        mapControls(this.objControls);
        this.objFormParent.addControl(this.strNombre,this.objForm);
  }

  ngOnDestroy(): void {
   this.objFormParent.removeControl(this.strNombre);
  }
}
