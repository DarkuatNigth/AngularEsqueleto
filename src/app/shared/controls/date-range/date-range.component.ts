import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
export interface objValor {
  nbfrom: number,
  nbto: number
}
export interface objPlaceholder{
  strFrom:string,
  strTo:string
}


@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> DateRangeComponent),
    multi:true
  }]
})
export class DateRangeComponent implements OnInit , ControlValueAccessor  {

  @Input() objPlaceHolder!: objPlaceholder;
  @Input() nbMin !:Date;
  @Input() nbMax !:Date;
  @Output() objChanged =  new EventEmitter<objValor>();
  @Output() objClosed = new EventEmitter<void>();
  objForm !: FormGroup;

  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.objForm = this.fb.group({
      strFrom:[null],
      strTo:[null]
    })
  }

  get dtMin():Date{
    const objFrom = this.objForm.controls.strFrom.value;
    return objFrom ? new Date(objFrom) : new Date();
   }


   get dtMax():Date{
    const objTo = this.objForm.controls.strTo.value;
    return objTo ? new Date(objTo) : new Date();
   }

  writeValue(objValor: objValor): void {
    this.objForm.patchValue(objValor || {});
  }


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

registerOnTouched(fn: any): void {
    this.registerOnTouched = fn;
  }


  setDisabledState(blIsDisabled: boolean): void {
    if(blIsDisabled){
      this.objForm.disable();
    }
    else{
      this.objForm.enable();
    }
}

onChanged():void{
    const objValor = {...this.objForm.value};
    this.propagateChange(objValor);
    this.objChanged.emit(objValor);
}

onClosed():void{
  this.propagateTouched();
  this.objClosed.emit();

}

}
