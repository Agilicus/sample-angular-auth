import { Component, OnInit } from '@angular/core';
import { Auth, TokensService, User } from 'agilicus-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public auth: Auth;
  public user$: Observable<User>;

  // These two settings (client-id and issuer) will need to be adjusted.
  // In general, each application should have its own client-id
  constructor(tokens: TokensService) {
    this.auth = new Auth('app-1', 'https://auth.cloud.egov.city', tokens);
  }

  public ngOnInit(): void {
    this.user$ = this.auth.user$();
  }

  public async onLoginClick(): Promise<void> {
    await this.auth.login();
  }

  public async onLogoutClick(): Promise<void> {
    await this.auth.logout();
  }

  public getUserRoles(roles: { [key: string]: Array<string> }): string {
    return JSON.stringify(roles);
  }

  public getUser(user: { [key: string]: Array<string> }): string {
    return JSON.stringify(user);
  }

  public getAccessToken(): string {
    return this.auth.access_token();
  }

  public getIdToken(): string {
    return this.auth.id_token();
  }
}
