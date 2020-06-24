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

  constructor(tokens: TokensService) {
    this.auth = new Auth(
      'admin-portal',
      'https://auth.cloud.egov.city',
      tokens
    );
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
}
