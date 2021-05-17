import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private webReqService: WebRequestService) { }

  // Team create/edit/delete no being implemented currently
  // createTeam(){}
  // updateTeam(){}
  // deleteTeam(){}

  getTeam(name: string){
    return this.webReqService.get(`teams/${name}`);
  }
  
  getTeams(){
    return this.webReqService.get('teams');
  }
}
