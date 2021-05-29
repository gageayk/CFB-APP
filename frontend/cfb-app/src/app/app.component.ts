import { Component } from '@angular/core';

declare var chart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cfb-app';
  chart: any;
}
