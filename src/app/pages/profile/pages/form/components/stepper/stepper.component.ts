import { Component, OnInit } from '@angular/core';
import { StepperService } from './services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor(private objServiceStepper: StepperService) { }

  ngOnInit(): void {
  }

  get lstStepper(){
    return this.objServiceStepper.lstStep;
  }

  get EstadoStepper(){
    return this.objServiceStepper.objEstadoStep;
  }

  isActive(nbIndice: number):boolean{
    return nbIndice === this.EstadoStepper.nbIndice;
  }

  isCompleted(nbIndice: number):boolean{
    return nbIndice < this.EstadoStepper.nbIndice;
  }
  isLast(nbIndice: number):boolean{
    return this.EstadoStepper.nbIndice === this.lstStepper.length - 1 ;
  }
}
