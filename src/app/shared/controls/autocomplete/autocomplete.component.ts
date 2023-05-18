import { Component, OnInit, OnDestroy, Input, EventEmitter,  forwardRef, Output } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

import {Subject, Observable} from 'rxjs';

import {takeUntil, distinctUntilChanged, startWith, map, filter} from 'rxjs/operators';

import {ControlItem, objValor} from '@app/models/frontend';
export {ControlItem, objValor} from '@app/models/frontend';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => AutocompleteComponent ),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() lstItem!: ControlItem[];
  @Input() strPlaceholder!: string;

  @Output() objChanged = new EventEmitter<objValor>();

  objFormControl = new FormControl();

  objOptions$!: Observable<ControlItem[]>;

  private objDestroy = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    this.objOptions$ = this.objFormControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string' || typeof value==='object'),
      map(value => typeof value === 'string' ? value : value.strLabel),
      map(label =>  label ? this.filter(label) : this.lstItem.slice())
    )


    this.objFormControl.valueChanges.pipe(
      takeUntil(this.objDestroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.objValor : '';
      this.propagateChange(value);
      this.objChanged.emit(value);
    })

  }

  ngOnDestroy(): void{
    this.objDestroy.next('');
    this.objDestroy.complete();
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.lstItem.filter(lstItem => lstItem.strLabel.toLowerCase().includes(filterValue));
  }


  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}

  writeValue(value: objValor) : void{
    console.log(value);
     const selectedOption = this.lstItem.find(item => item.objValor === value);
     this.objFormControl.patchValue(selectedOption ? selectedOption : value, { emitEvent: false });
     //console.log(this.objFormControl);
  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{
    this.propagateTouched = fn;

  }

  setDisabledState(isDisabled: boolean): void {
    if(isDisabled){
      this.objFormControl.disable();
    }else{
      this.objFormControl.enable();
    }
  }


  displayFn(item?: ControlItem): string  {
    return item ? item.strLabel : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }


}
