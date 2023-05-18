import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
type objPasswordType = 'password'| 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef( ()=> PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  strValor !: string
  blIsDisabled!: boolean;
  strPasswordType !: objPasswordType;
  @Input() strPlaceholder !:string;
  @Output() strChanged = new EventEmitter<string>();

  constructor() {
    this.strPasswordType ='password';
   }

  ngOnInit(): void {
  }

  private propagateChange: any = () =>{};
  private propagateTouched: any = () =>{};

  writeValue(strValor: string): void {
    this.strValor = strValor;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.propagateTouched = fn;
  }

  setDisabledState(blIsDisabled: boolean): void {
    this.blIsDisabled= blIsDisabled;
  }

  onKeyup(objEvent: Event): void{
    const {target} = objEvent;
    this.strValor = (target as HTMLInputElement).value;
    this.propagateChange(this.strValor);
    this.strChanged.emit(this.strValor);
  }

  onBlur():void{
    this.propagateTouched();
  }

  togglePassword(): void{
    this.strPasswordType = this.strPasswordType == 'password' ? 'text' : 'password';
  }

}
