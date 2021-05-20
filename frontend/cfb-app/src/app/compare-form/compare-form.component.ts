import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.css']
})
export class CompareFormComponent implements OnInit {
  teams: Array<string> = []
  leftTeam: string = "Air Force"
  rightTeam: string = "Akron"
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

  onSubmit(left: string, right: string) {
    if(left == ""){
      this.leftTeam = "Air Force"
    }else{
      this.leftTeam = left
    }

    if(right == ""){
      this.rightTeam = "Air Force"
    }else{
      this.rightTeam = right
    }

    // console.log(this.leftTeam)
    // console.log(this.rightTeam)
  }

}
