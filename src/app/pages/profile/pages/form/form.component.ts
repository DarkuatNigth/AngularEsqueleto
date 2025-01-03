import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';

import { Store, select  } from  '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromDiccionarios from '@app/store/dictionaries';
import * as fromUser from '@app/store/user';
import { objFormPersonal } from './components/personal/personal.component';
import { objFormProfessional } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapperService } from './services';
import * as objFrom from '../../store/form';

export interface objProfileForm{
  objPersonal:objFormPersonal | null ;
  objProfessional: objFormProfessional | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  private objDestroy = new Subject<any>();
  obsDiccionarios$ !: Observable<fromDiccionarios.Diccionarios> | Observable<any>;
  obsDiccionarioIsReady$  !: Observable<boolean>;
  obsPersonal$ !: Observable<objFormPersonal>| Observable<any>;
  obsProfessional$!: Observable<objFormProfessional>| Observable<any>;
 private obsProfile$ !: Observable<objProfileForm>| Observable<any>;
 private blEnEdicion !: boolean;
 obsBlCargando$ !: Observable<boolean>;

  private objUsuario !: fromUser.Usuario;
  constructor(
    private objRouter: Router,
    private objMapperService: MapperService,
    private objRoute: ActivatedRoute,
    public objServiceStepper : StepperService,
    public objStore : Store<fromRoot.objEstado>
  ) { }

  ngOnInit(): void {
    this.objUsuario = this.objRoute.snapshot.data.user;
    this.blEnEdicion = !!this.objUsuario;
    this.obsProfile$ = this.objStore.pipe(select(objFrom.getFromState));
    this.obsPersonal$ = this.objStore.pipe(select(objFrom.getPersonalForm)) as Observable<objFormPersonal>;
    this.obsProfessional$ = this.objStore.pipe(select(objFrom.getProfesionalForm)) as Observable<objFormProfessional>;
    this.obsBlCargando$ = this.objStore.pipe(select(fromUser.getLoading)) as Observable<boolean>;
    if(this.objUsuario){
       const form = this.objMapperService.userToForm(this.objUsuario);
       this.objStore.dispatch(new objFrom.fnSet(form));
    }
    this.obsDiccionarios$ = this.objStore.pipe(select(fromDiccionarios.obtenerDiccionario)) as Observable<any>;
    this.obsDiccionarioIsReady$ = this.objStore.pipe(select(fromDiccionarios.getIsReady)) as Observable<boolean>;

    this.objServiceStepper.init([
      {cnoLlave: 'personal', cnoLabel : 'Personal'},
      {cnoLlave: 'professional', cnoLabel : 'Profesional'},
    ])


    this.objServiceStepper.objObsComplete$.pipe(
      switchMap(()=> zip(this.obsProfile$,this.obsDiccionarios$)),
      takeUntil(this.objDestroy)
    ).subscribe(([objProfile,objDiccionarios])=>{
      console.log('stepper Completado');
      this.onComplete(objProfile, this.objUsuario, objDiccionarios);
    })


    this.objServiceStepper.objObsCancel$.pipe(takeUntil(this.objDestroy)).subscribe(()=>{
      this.objRouter.navigate(['/profile', this.objUsuario.strUid]);
      console.log('stepper Cancelado');
    })
  }


  ngOnDestroy(): void {
      this.objDestroy.next(null);
      this.objDestroy.complete();
      this.objStore.dispatch(new objFrom.fnClear());
  }

  onChangedPersonal(objValue: objFormPersonal):void{
    this.objStore.dispatch(new objFrom.fnUpdate({objPersonal: objValue}));
  }
  onChangedProfesional(objValue: objFormProfessional):void{
    console.log(objValue);
  }

  private onComplete(
    objProfile: objProfileForm,
    objuser: fromUser.Usuario,
    objDiccionario: fromDiccionarios.Diccionarios): void
  {
    if(this.blEnEdicion){
      const objRequest = this.objMapperService.formToUserUpdate(objProfile,objuser,objDiccionario);
      this.objStore.dispatch(new fromUser.fnUpdate(objRequest));
    }else{
      const objRequest = this.objMapperService.formToUserCreate(objProfile,objDiccionario);
      this.objStore.dispatch(new fromUser.fnCreate(objRequest));
    }
  }

  get title():string{
    return this.blEnEdicion ? 'Editar Perfil de Usuario': 'Nuevo Perfil de Usuario';
  }
}
