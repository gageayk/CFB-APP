import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/team.service'

declare var Chartkick: any

@Component({
  selector: 'app-national-avg',
  templateUrl: './national-avg.component.html',
  styleUrls: ['./national-avg.component.css']
})
export class NationalAvgComponent implements OnInit {
  public teams: Array<any> = []
  public teamNames: Array<any> = []
  public totOff: number = 0
  public totOffArray: Array<any> = []
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((response) => {
      console.log(response)
      for(let i = 0; i < Object.keys(response).length; i++){
        this.teams.push(Object.values(response[i]))
        this.teamNames.push(response[i]._id)
      }
      this.teams.sort()
      this.teamNames.sort()

      this.getAvgs()
    })
  }

  getAvgs(){
    // converting strings to floats 
    
    for(let i = 0; i < this.teams.length; i++){
      for(let j = 0; j < this.teams[i].length; j++){
        // not name or time slot
        if(j != 0 && j != 27){
          this.teams[i][j] = parseFloat(this.teams[i][j])
        }
      }
      this.totOff = this.totOff + this.teams[i][1]
      this.totOffArray.push([i,this.teams[i][1]])
    }
    // const sum = (accumulator, currentValue) => accumulator + currentValue;
    // Compare function to do correct sorting
    

    this.totOff = parseFloat((this.totOff / this.teams.length).toPrecision(4))
    this.totOffArray = this.totOffArray.sort(function compare(a, b){
      if(a[1] < b[1]){
        return -1
      }
      if(a[1] > b[1]){
        return 1
      }
      return 0
    })

    //reordering the array correctly
    for(let i = 0; i < this.totOffArray.length; i++){
      this.totOffArray[i][0] = i
    }

    // calculating std

    let sum: number = 0
    for(let i = 0; i < this.totOffArray.length; i++){
      sum = (this.totOffArray[i][1] - this.totOff)
      sum = sum * sum
    }
    let std = Math.sqrt(sum / this.totOffArray.length)
    console.log(std)
    // console.log(this.totOffArray)
    new Chartkick.LineChart("totOff", this.totOffArray)
  }
}
