import { Component, OnInit, Input,  } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() singleTeam
  @Input() compTeam
  constructor() { }

  ngOnInit(): void {
  }

}
