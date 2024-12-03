import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pages/welcome/welcome-routing.module').then(
        (obj) => obj.WelcomeRoutingModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/not-found/not-found-routing.module').then(
        (obj) => obj.NotFoundRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule {}
