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

  isFirst():boolean{
    return this.EstadoStepper.nbIndice === 0 ;
  }

  isLast():boolean{
    return this.EstadoStepper.nbIndice === this.lstStepper.length - 1 ;
  }

  onNext(){
    this.objServiceStepper.onNext();
  }

  onComplete(){
  }

  onPrev(){
    this.objServiceStepper.onPrev();
  }

  onCancel(){

  }
}
