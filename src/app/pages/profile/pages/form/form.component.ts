import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  private objDestroy = new Subject<any>();

  constructor(public objServiceStepper : StepperService) { }

  ngOnInit(): void {
    this.objServiceStepper.init([
      {cnoLlave: 'personal', cnoLabel : 'Personal'},
      {cnoLlave: 'professional', cnoLabel : 'Profesional'},
    ])


    this.objServiceStepper.objObsComplete$.pipe(takeUntil(this.objDestroy)).subscribe(()=>{
      console.log('stepper Completado');
    })


    this.objServiceStepper.objObsCancel$.pipe(takeUntil(this.objDestroy)).subscribe(()=>{
      console.log('stepper Cancelado');
    })
  }


  ngOnDestroy(): void {
      this.objDestroy.next(null);
      this.objDestroy.complete();
  }

}
