import { Component, Input, OnInit, Output, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => InputComponent),
      multi: true,
    },
  ]
})

export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() strPlaceHolder!: string;
  @Output() objChanged = new EventEmitter<string>();
  strValor!: string;
  blDisabled!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange:any = () => {}
  private propagateTouched:any = () => {}
  writeValue(strValue:string):void{
    this.strValor = strValue;
  }
  registerOnChange(obj:any):void{
    this.propagateChange = obj;
  }
  registerOnTouched(obj:any):void{
    this.propagateTouched = obj;
  }
  setDisabledState(blDisabled: boolean): void{
    this.blDisabled = blDisabled;
  }

  onKeyUp(objEvent : Event):void{
    const{ target } = objEvent;
    this.strValor = (target as HTMLInputElement).value;
    this.propagateChange(this.strValor);
    this.objChanged.emit(this.strValor);
  }

  onBlur():void{
    this.propagateTouched();
  }

}
