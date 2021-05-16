import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HomePageComponent } from './home-page/home-page.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthButtonComponent },
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
