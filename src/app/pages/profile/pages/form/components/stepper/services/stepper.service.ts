import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Step {
  cnoLlave : string;
  cnoLabel: string;
}

export interface EstadoStep extends Step{
  nbIndice : number;
}

@Injectable()
export class StepperService {
  lstStep !: Step[];
  objEstadoStep !: EstadoStep;

  objNext = new Subject<boolean>();
  objObsNext$ !: Observable<boolean>;

  objComplete = new Subject<boolean>();
  objObsComplete$ !: Observable<boolean>;

  objPrev = new Subject<void>();
  objObsPrev$= this.objPrev.asObservable();

  objCancel = new Subject<void>();
  objObsCancel$= this.objCancel.asObservable();

  objCheck = new Subject<'next'| 'complete'>();
  objObsCheck$ = this.objCheck.asObservable();

  init(listStep: Step[]):void{
    this.lstStep = listStep;
    this.objEstadoStep = {...listStep[0],nbIndice:0}
  }
  constructor() {

    this.objObsNext$ = this.objNext.asObservable().pipe(filter(isOk=> isOk));
    this.objObsComplete$ = this.objComplete.asObservable().pipe(filter(isOk => isOk));

   }

  onNext():void{
    const nqnIndice = this.objEstadoStep.nbIndice +1;
    this.objEstadoStep = {...this.lstStep[nqnIndice],nbIndice: nqnIndice} ;
  }

  onPrev():void{
    const nqnIndice = this.objEstadoStep.nbIndice -1;
    this.objEstadoStep = {...this.lstStep[nqnIndice],nbIndice: nqnIndice} ;
  }
}
