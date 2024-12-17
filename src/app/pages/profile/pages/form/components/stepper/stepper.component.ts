import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  private objDestroy  = new Subject<any>();
  constructor(private objServiceStepper: StepperService) { }

  ngOnInit(): void {
    this.objServiceStepper.objObsNext$.pipe(takeUntil(this.objDestroy)).subscribe(()=>
    {
      this.objServiceStepper.onNext();
    })
  }

  ngOnDestroy(): void {
    this.objDestroy.next(null);
    this.objDestroy.complete();
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
    //this.objServiceStepper.onNext();
    this.objServiceStepper.objCheck.next('next');
  }

  onComplete(){
    this.objServiceStepper.objCheck.next('complete');
  }

  onPrev(){
    this.objServiceStepper.onPrev();
  }

  onCancel(){
    this.objServiceStepper.objCancel.next();
  }
}
