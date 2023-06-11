import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';  

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
		path: 'home',
		loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
		...canActivate(redirectUnauthorizedToLogin)
	},
  {
		path: '',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
		...canActivate(redirectLoggedInToHome)
	},
  {
    path: 'make-appointment',
    loadChildren: () => import('./make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule),
		...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'show-appointment',
    loadChildren: () => import('./show-appointment/show-appointment.module').then( m => m.ShowAppointmentPageModule),
		...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
