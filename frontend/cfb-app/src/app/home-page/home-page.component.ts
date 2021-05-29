import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public singleTeam = false
  public compTeam = false
  public natAvg = false
  constructor() { }

  ngOnInit(): void {
  }

  selectSingleTeam() {
    this.singleTeam = true
    this.compTeam = false
    this.natAvg = false
  }

  selectCompTeam() {
    this.singleTeam = false
    this.compTeam = true
    this.natAvg = false
  }
  
  selectNatAvg() {
    this.singleTeam = false
    this.compTeam = false
    this.natAvg = true
  }

}
