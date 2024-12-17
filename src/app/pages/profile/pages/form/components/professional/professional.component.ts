import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  private objDestroy = new Subject<any>();
  constructor(private objServiceStepper: StepperService) { }

  ngOnInit(): void {
    this.objServiceStepper.objObsCheck$.pipe(takeUntil(this.objDestroy)).subscribe((type)=>{
      //type == 'next'
      console.log(type);
        this.objServiceStepper.objComplete.next(true);
    })
  }

  ngOnDestroy(): void {
    this.objDestroy.next(null);
    this.objDestroy.complete();
  }

}
