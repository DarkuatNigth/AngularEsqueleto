import { Injectable } from '@angular/core';

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
  init(listStep: Step[]):void{
    this.lstStep = listStep;
    this.objEstadoStep = {...listStep[0],nbIndice:0}
  }
  constructor() { }

  onNext():void{
    const nqnIndice = this.objEstadoStep.nbIndice +1;
    this.objEstadoStep = {...this.lstStep[nqnIndice],nbIndice: nqnIndice} ;
  }

  onPrev():void{
    const nqnIndice = this.objEstadoStep.nbIndice -1;
    this.objEstadoStep = {...this.lstStep[nqnIndice],nbIndice: nqnIndice} ;
  }
}
