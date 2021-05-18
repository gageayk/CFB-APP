import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';
import { FormToTeamService } from 'src/app/form-to-team.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
  currentTeam: any;
  constructor(private teamService: TeamService, private formToTeamService: FormToTeamService) { }

  ngOnInit(): void { 
    this.teamService.getTeam(this.formToTeamService.teamName).subscribe((obj: any) => {
      // this.currentTeam = Object.entries(obj)
      this.currentTeam = Object.values(obj)
      // getting rid of generated value
      this.currentTeam.pop()
      // console.log(this.currentTeam)
    })
  }

  getTeams(){
    this.teamService.getTeams().subscribe((response) => {
      console.log(response)
    })
  }

  getTeam(name: string){
    this.teamService.getTeam(name).subscribe((response) => {
      console.log(response)
      // return response
      // this.currentTeam = response
    })
    // console.log(this.currentTeam)
  }

}
