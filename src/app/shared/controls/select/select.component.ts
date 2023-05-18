import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, objValor } from '@app/models/frontend';
export { ControlItem, objValor } from '@app/models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> SelectComponent),
      multi:true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() lstItem !: ControlItem[];
  @Input() strPlaceHolder !: string;
  @Output() objChanged = new EventEmitter<objValor>();
  objValor !: objValor;
  blIsDisabled !: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any =() =>{}
  private propagateTouched: any=() =>{}

  writeValue(objValor: objValor): void {
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

  onChanged(objEvent: MatSelectChange): void{
    const objValue = objEvent.value ? objEvent.value : null;
    this.objValor = objValue;
    this.propagateChange(this.objValor);
    this.objChanged.emit(this.objValor);
  }

  onBlur():void{
    this.propagateTouched();
  }
}
