import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  teams: Array<string> = []
  public teamName = "Air Force";
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((response) => {
      for(let i = 0; i < Object.keys(response).length; i++){
        this.teams.push(response[i]._id)
      }
      this.teams.sort()
    })
  }

  submitted = false;

  onSubmit(team: any) {
    if(team.name == ""){
      this.teamName = "Air Force"
    }else{
      this.teamName = team.name
    }
  }

}
