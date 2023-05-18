import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, objValor } from '@app/models/frontend';
export { ControlItem, objValor } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> CheckboxesComponent),
      multi:true
    }
  ]

})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
  objValor!: objValor[];
  blIsDisabled!: boolean;

  @Input() lstItem !: ControlItem[];
  @Output() objChange !: EventEmitter<objValor[]>;
  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any =() =>{}
  private propagateTouched: any=() =>{}
  writeValue(objValor: objValor[]): void {
    this.objValor = objValor;
  }


  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(blIsDisabled: boolean): void {
      this.blIsDisabled = blIsDisabled;
  }

  onChanged(objValor: objValor, objEmmitCheck: Event):void{
    const {target} = objEmmitCheck;
    const objResult = (target as HTMLInputElement).checked;
    const objSelected = this.getSelected(objValor,objResult);
    this.objValor = objSelected;
    this.propagateChange(objSelected);
    this.objChange.emit(objSelected);
  }

  isChecked(objValor: objValor) :boolean{
    return this.objValor && this.objValor.includes(objValor);
  }

  private getSelected(objValor: objValor, objChecked: Boolean):objValor[]{
    const objSelected : objValor[] = this.objValor ? [...this.objValor]:[];
    if(objChecked){
      if(!objSelected.includes(objValor)){
        objSelected.push(objValor);
      }
      else{
        const objIndex = objSelected.indexOf(objValor);
        objSelected.splice(objIndex,1);
      }
    }
    return objSelected.length ? objSelected : [];
  }
}
