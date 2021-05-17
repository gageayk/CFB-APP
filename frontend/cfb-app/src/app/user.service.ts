import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webReqService: WebRequestService) { }

  createUser(email: string, name: string, favTeams: Array<string>) {
    return this.webReqService.post('users', {email, name, favTeams});
  }

  updateUser(email: string, name: string, favTeams: Array<string>) {
    return this.webReqService.patch('users', {email, name, favTeams});
  }

  getUsers() {
    return this.webReqService.get('users');
  }

  deleteUser(id: string) {
    return this.webReqService.delete(`users/${id}`)
  }
}
