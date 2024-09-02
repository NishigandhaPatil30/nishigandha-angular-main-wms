import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { RegistrationComponent } from './demo/components/auth/registration/registration.component';
import { ForgotpasswordComponent } from './demo/components/auth/forgotpassword/forgotpassword.component';
import { RedirectComponent } from './demo/components/auth/redirect/redirect.component';
const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/registration', component: RegistrationComponent },
  { path: 'login/forgotpassword', component: ForgotpasswordComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      { path: 'modules', loadChildren: () => import('./demo/components/modules/modules.module').then(m => m.ModulesModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
