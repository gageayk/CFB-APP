import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-compare-teams',
  templateUrl: './compare-teams.component.html',
  styleUrls: ['./compare-teams.component.css']
})
export class CompareTeamsComponent implements OnChanges {
  @Input()  rightTeam = "Akron";
  @Input()  leftTeam = "Air Force";


  public currentLeftTeam: any
  public currentRightTeam: any
  public differences = []

  public labels = ["Team","Total Offense", "Rushing Offense", "Passing Offense", "Team Passing Efficiency", "Scoring Offense", 
  "Total Defense", "Rushing Defense", "Passing Yards Allowed", "Team Passing Efficiency Defense", "Scoring Defense",
  "Turnover Margin", "3rd Down %", "4th Down %", "3rd Down % Defense", "4th Down % Defense", "Red Zone Offense", "Red Zone Defense",
  "Net Punting", "Punt Returns", "Kickoff Returns", "First Downs Offense", "First Downs Defense", "Fewest Penalties PG",
  "Fewest Penalty Yds PG", "Time of Possession"]

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    for(let i = 0; i < this.labels.length; i++){
      let spot = new Array(3)
      this.differences.push(spot)
    }
    // Setting difference of names to be empty string
    this.differences[0][2] = ""
  }

  ngOnChanges(changes: SimpleChanges) {
    for(const propName in changes){
      if(propName == "leftTeam"){
        this.getTeam(this.leftTeam, "left")
      }else if(propName == "rightTeam"){
        this.getTeam(this.rightTeam, "right")
      }
    }
    
  }

  getTeam(name: string, side: string){
    let team = []
    this.teamService.getTeam(name).subscribe((response) => {
      let stats = Object.values(response)
      stats.pop()
      for(let i = 0; i < stats.length; i++){
        let place = [this.labels[i],stats[i]]

        // Updating differences table
        if(side == "left"){
          this.differences[i][0] = stats[i]
        }else{
          this.differences[i][1] = stats[i]
        }
        // No need to resest difference of names
        if(i != 0){
          // Fixing Time subtraction 
          if( i == 25){
            if(this.differences[i][0] != undefined && this.differences[i][1] != undefined){
              let time1 = this.differences[i][0].split(":")
              time1 = parseFloat(time1[0])*60 + parseFloat(time1[1])

              let time2 = this.differences[i][1].split(":")
              time2 = parseFloat(time2[0])*60 + parseFloat(time2[1])

              let timeDiff = (time1 - time2) / 60
              this.differences[i][2] = `(${timeDiff.toFixed(2)})`
            }
          }else{
            this.differences[i][2] = `(${(this.differences[i][0] - this.differences[i][1]).toPrecision(4)})`
          }
        }

        team.push(place)
      }
      if(side == "left"){
        this.currentLeftTeam = team
      }else{
        this.currentRightTeam = team
      }
    })
  }
}
