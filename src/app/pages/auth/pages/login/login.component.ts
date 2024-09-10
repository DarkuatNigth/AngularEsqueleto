import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { regex, regexErrors, markFormGroupTouched } from '@app/shared';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/user';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  blCargando$ !: Observable<boolean | null>;
  objFormulario !: FormGroup;
  objRegexError = regexErrors;

  constructor(
    private objFb : FormBuilder,
    private objStore: Store<fromRoot.objEstado>
  ) { }

  ngOnInit(): void {
    this.blCargando$ = this.objStore.pipe(select(fromUsuario.getLoading));
    this.objFormulario = this.objFb.group({strCorreo: [
      null,
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email),
        ],
      },
    ],
    strClave: [
      null,
      {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(regex.password),
        ],
      },
    ]
    });
  }

  public onSubmit(): void{
    console.log(this.objFormulario.value);
    if(this.objFormulario.invalid){
      markFormGroupTouched(this.objFormulario);
      console.log(this.objFormulario);
    }

    const objValor = this.objFormulario.value;
    const objCredenciales: fromUsuario.CorreoContraseñaCredenciales={
      strCorreo: objValor.strCorreo,
      strPassword: objValor.strClave
    };

    console.log(objCredenciales);
    this.objStore.dispatch( new fromUsuario.fnSignInEmail(objCredenciales));
  }
}
