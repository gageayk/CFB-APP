import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, UrlSegment } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  // public userProfile: gapi.auth2.BasicProfile
  constructor(private userService: UserService, private router: Router) { }
  

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
      // this.router.navigate(['/home'])
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi loaded
    // and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '1070428364450-b268ei0012oqle21ee4mchbp7cafcj8u.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.user = user,
        error => this.error = error);

      // Creating user account if first time logging in, otherwise nothing. 
      // favTeams filled with new (this will be for original popup to select fav teams, if skipped then just empty)
      this.userService.getUsers().subscribe((users: any) => {
        let stored = false;
        for(const usr in users){
          if(this.user.getBasicProfile().getEmail() === users[usr].email){
            stored = true
          }
        }
        
        if(stored == false){
          this.createUser(this.user.getBasicProfile().getEmail(), this.user.getBasicProfile().getName(), ['new'])
        }
        // else{
        //   console.log('Account already present!')
        // }
      })
      this.router.navigate(['/home'])
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

  createUser(email: string, name: string, favTeams: Array<string>) {
    this.userService.createUser(email, name, favTeams).subscribe((response: any) => {
      console.log(response)
    })
  }  

}
