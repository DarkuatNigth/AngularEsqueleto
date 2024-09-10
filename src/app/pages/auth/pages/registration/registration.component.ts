import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  objFormularioRegistro!: FormGroup;
  objRegexErrors = regexErrors;
  blCargando$!: Observable<boolean | null>;
  constructor(
    private objFormBuilder: FormBuilder,
    private objStore: Store<fromRoot.objEstado>
  ) {}

  ngOnInit(): void {
    console.log(fromUsuario.getLoading);
    this.blCargando$ = this.objStore.pipe(select(fromUsuario.getLoading));
    this.objFormularioRegistro = this.objFormBuilder.group({
      strCorreo: [
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
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
      strClaveRepetida: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
    },{validator: this.validarClaveRepetida});
  }

  private validarClaveRepetida(
    objFormulario: FormGroup
  ): { [key: string]: boolean } | null {
    const strClave = objFormulario.get('strClave');
    const strClaveRepetida = objFormulario.get('strClaveRepetida');
    return strClaveRepetida?.value &&
      strClave?.value !== strClaveRepetida?.value
      ? { strRepetido: true }
      : null;
  }


  onSubmit(): void{
    if(this.objFormularioRegistro.invalid){
      markFormGroupTouched(this.objFormularioRegistro);
    }
    const objValorForm = this.objFormularioRegistro.value;
    console.log(objValorForm);
    const objCredenciales : fromUsuario.CorreoContraseñaCredenciales = {
      strCorreo: objValorForm.strCorreo,
      strPassword: objValorForm.strClaveRepetida
    }
    this.objStore.dispatch(new fromUsuario.fnSignUpEmail(objCredenciales))

  }
}
