import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { CompareTeamsComponent } from './compare-teams/compare-teams.component';
import { CompareFormComponent } from './compare-form/compare-form.component';
import { NationalAvgComponent } from './national-avg/national-avg.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    DashboardComponent,
    HomePageComponent,
    SingleTeamComponent,
    TeamFormComponent,
    CompareTeamsComponent,
    CompareFormComponent,
    NationalAvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
