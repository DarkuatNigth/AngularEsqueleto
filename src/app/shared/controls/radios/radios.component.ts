import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { ControlItem, objValor } from '@app/models/frontend';


@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> RadiosComponent),
      multi: true
    }
  ]
})
export class RadiosComponent implements OnInit, ControlValueAccessor {
  objValor !: objValor;
  blIsDisabled !: boolean;
  @Input()  lstItem !: ControlItem[];
  @Output() objChanged = new EventEmitter<objValor>();

  constructor() { }

  ngOnInit(): void {
  }
  private propagateChange:any=()=>{}

  writeValue(objValor: objValor): void {
    this.objValor = objValor;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState(blIsDisabled: boolean): void {
      this.blIsDisabled = blIsDisabled;
  }

  onChanged(objValor : objValor):void{
    this.objValor = objValor;
    this.propagateChange(objValor);
    this.objChanged.emit(objValor);
  }

  isChecked(objValor: objValor): boolean{
    return this.objValor == objValor;
  }

}
