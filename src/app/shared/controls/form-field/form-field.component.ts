import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() strLabel!: string;
  @Input() blRequired!: boolean;
  @Input() blInLine!: boolean;
  @Input() objControl!: AbstractControl;
  @Input() strPatternError!: string;

  constructor() {
    this.blInLine = true;
  }

  ngOnInit(): void {
  }

  hasError(): boolean{
    return this.objControl && this.objControl.invalid && this.objControl.touched;
  }

  get errorKey(){
    return this.objControl && this.objControl.errors && Object.keys(this.objControl.errors)[0];
  }
}
