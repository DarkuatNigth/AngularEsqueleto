import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { regex, regexErrors, markFormGroupTouched } from '@app/shared';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  objFrom!: FormGroup;
  blInLine! : boolean;
  strRegexErrors = regexErrors;
  lstItem !: ControlItem[];
  showSpinner = false;
  constructor(private objFb: FormBuilder,
    private objNotificacion : NotificationService
  ) {
    this.blInLine=true;
    this.lstItem = [
      {strLabel:'Uno', objValor: 1},
      {strLabel:'Dos', objValor: 2},
      {strLabel:'Tres', objValor: 3},
      {strLabel:'Cuatro', objValor: 4},
      {strLabel:'Cinco', objValor: 5},
      {strLabel:'Seis', objValor: 6},
    ]
  }

  ngOnInit(): void {
    this.objFrom = this.objFb.group({
      strValorInput: [null, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.number)
        ]
      }],
      strPasswordInput: [null,{
        updateOn:'blur',
        validators:[
          Validators.required
        ]
      }],
      strAutoComplete: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }],
      objSelect: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }],
      objCheckBoxs: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }],
      objRadios: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }],
      objDate: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }],
      objDateRange: [null,{
        updateOn:'change',
        validators:[
          Validators.required
        ]
      }]
    })
  }

  onPatchValue(){
    let objValorDtRange = this.objFrom.controls.objDateRange.value;
    console.log(objValorDtRange);
    this.objFrom.patchValue(
      {strValorInput:'1234',
        strPasswordInput:'Pasword',
        strAutoComplete:1,
        objSelect:2,
        objCheckBoxs:[3],
        objRadios:4,
        objDate:new Date().getTime(),
        objDateRange:{
          strFrom: new Date(2022,5,10).getTime(),
          strTo:new Date(2022,11,10).getTime(),
        }
      },
    );
    console.log(this.objFrom);
  }

  onSubmit(): void{
    //console.log('Hola');
    //console.log(this.objFrom);
    if(!this.objFrom.valid){
      //console.log('entra');
      markFormGroupTouched(this.objFrom);
      //console.log(this.objFrom);
    }
  }
  onReset():void{
    if(this.objFrom.valid){
      this.objFrom.reset();
    }
  }

  organizarElemento(){
    this.blInLine= !this.blInLine;
  }

  onToggleDisabled(): void{
    if(this.objFrom.enabled){
      this.objFrom.disable();
    }else{
      this.objFrom.enable();
    }

  }

  onToggleSpinner(): void{
    this.showSpinner = !this.showSpinner;
  }
  onSuccess() :void{
    this.objNotificacion.success("El procedimiento fue exitoso.");
  }
  onError():void{
    this.objNotificacion.error("Se encontraron errores en el proceso.");
  }

}
