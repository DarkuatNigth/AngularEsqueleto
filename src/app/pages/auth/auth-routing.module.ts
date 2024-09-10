import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((obj) => obj.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (obj) => obj.RegistrationModule
      ),
  },
  {
    path: 'confirmacion-email',
    loadChildren: () =>
      import('./pages/email-confirm/email-confirm.module').then(
        (obj) => obj.EmailConfirmModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
