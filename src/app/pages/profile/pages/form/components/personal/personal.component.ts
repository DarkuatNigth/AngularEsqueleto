import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {

private objDestroy = new Subject<any>();
  constructor(private objServiceStepper: StepperService) { }

  ngOnInit(): void {
    this.objServiceStepper.objObsCheck$.pipe(takeUntil(this.objDestroy)).subscribe((type)=>{
      //type == 'next'
      console.log(type);
        this.objServiceStepper.objNext.next(true);
    })
  }

  ngOnDestroy(): void {
    this.objDestroy.next(null);
    this.objDestroy.complete();
  }

}
