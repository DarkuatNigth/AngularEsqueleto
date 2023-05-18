import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
type objValor = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>DateComponent),
      multi:true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {
  @Input() strPlaceHolder!: string;
  @Input() nbMin !:Date;
  @Input() nbMax !:Date;

  @Output() objChanged = new EventEmitter<objValor>();

  objValor !: objValor;
  blIsDisabled!: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}

  get objInput(): Date{
    return this.objValor ? new Date(this.objValor) : new Date();
  }
  writeValue(objValor: objValor): void {
      this.objValor =objValor;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.registerOnTouched = fn;
  }

  setDisabledState(blIsDisabled: boolean): void {
      this.blIsDisabled = blIsDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void{
    const objValor = event.value ? event.value.getTime() : new Date().getTime();
    this.objValor = objValor;
    this.propagateChange(objValor);
    this.objChanged.emit(objValor);
  }

  onClosed(): void{
    this.propagateTouched();
  }

}
