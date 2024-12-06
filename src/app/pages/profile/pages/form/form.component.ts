import { Component, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(public objServiceStepper : StepperService) { }

  ngOnInit(): void {
    this.objServiceStepper.init([
      {cnoLlave: 'personal', cnoLabel : 'Personal'},
      {cnoLlave: 'professional', cnoLabel : 'Profesional'},
    ])
  }

}
