import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [LoggedInGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
