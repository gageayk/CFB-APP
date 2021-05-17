import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  getTeams(){
    this.teamService.getTeams().subscribe((response) => {
      console.log(response)
    })
  }

  getTeam(name: string){
    this.teamService.getTeam(name).subscribe((response) => {
      console.log(response)
    })
  }

}
