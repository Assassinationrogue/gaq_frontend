import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => {
        return m.PublicModule;
      })
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./private/private/private.module').then((m) => {
        return m.PrivateModule;
      }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
