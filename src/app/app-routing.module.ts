import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadasComponent } from './pages/cadas/cadas.component';
import { AuthGuard } from './components/guard/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadas',
    component: CadasComponent,
    data: {
      title: 'Cadas'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
