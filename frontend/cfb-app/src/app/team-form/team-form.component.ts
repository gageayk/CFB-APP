import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { FormToTeamService } from 'src/app/form-to-team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  teams: Array<string> = []
  constructor(private teamService: TeamService, private formToTeamService: FormToTeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((response) => {
      for(let i = 0; i < Object.keys(response).length; i++){
        this.teams.push(response[i]._id.toLowerCase())
      }
      this.teams.sort()
      for(let i = 0; i < Object.keys(response).length; i++){
        this.teams[i] = this.teams[i].charAt(0).toUpperCase() + this.teams[i].slice(1)
      }
    })
  }

  submitted = false;

  onSubmit(name: any) {
    this.formToTeamService.teamName = name
    console.log(name)
    // console.log(`Find Stats for ${name}`)
  }

}
