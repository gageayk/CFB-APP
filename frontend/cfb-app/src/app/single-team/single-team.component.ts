import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TeamService } from 'src/app/team.service';

declare var Chartkick: any

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnChanges {
  @Input() teamName = "Air Force"

  public currentTeam: any
  public labels = ["Team","Total Offense", "Rushing Offense", "Passing Offense", "Team Passing Efficiency", "Scoring Offense", 
  "Total Defense", "Rushing Defense", "Passing Yards Allowed", "Team Passing Efficiency Defense", "Scoring Defense",
  "Turnover Margin", "3rd Down %", "4th Down %", "3rd Down % Defense", "4th Down % Defense", "Red Zone Offense", "Red Zone Defense",
  "Net Punting", "Punt Returns", "Kickoff Returns", "First Downs Offense", "First Downs Defense", "Fewest Penalties PG",
  "Fewest Penalty Yds PG", "Time of Possession"]

  constructor(private teamService: TeamService) { }

  ngOnChanges() {
    this.getTeam(this.teamName)
  }

  // ngOnInit(): void { 
  //   
  // }

  getTeams(){
    this.teamService.getTeams().subscribe((response) => {
      console.log(response)
    })
  }

  getTeam(name: string){
    let team = []
    this.teamService.getTeam(name).subscribe((response) => {
      // console.log(response)
      // return response
      let stats = Object.values(response)
      stats.pop()
      for(let i = 0; i < stats.length; i++){
        let place = [this.labels[i],stats[i]]
        team.push(place)
      }
      this.currentTeam = team
      this.getOffPer()
    })
  }

  getOffPer(){
    let total = parseFloat(this.currentTeam[1][1])
    let rush = ((parseFloat(this.currentTeam[2][1]) / total) * 100).toPrecision(2)
    let pass = ((parseFloat(this.currentTeam[3][1]) / total) * 100).toPrecision(2)

    new Chartkick.PieChart("chart-1", [[`Rush Off`, rush], [`Pass Off`, pass]]
    )
  }
}
