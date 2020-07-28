import { Component, OnInit } from '@angular/core';
import { Auth, TokensService, User } from 'agilicus-angular';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

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
  // For demo purposes, we have assumed hostname is an existing
  // client-id
  constructor(tokens: TokensService) {
    let clientId = 'app-1';
    if (window.location.hostname !== 'localhost') {
      clientId = window.location.hostname.split('.')[0];
    }
    this.auth = new Auth(clientId, 'https://auth.cloud.egov.city', tokens);
  }

  public ngOnInit(): void {
    this.user$ = this.auth.user$();
  }

  private isMfaDemo(): boolean {
    return window.location.href.search('mfa-demo') !== -1 || window.location.href.search('localhost') !== -1;
  }
  get bannerWidth(): number {
    if (this.isMfaDemo()) {
      if (window.innerWidth < 450) {
        return 300;
      }
      return 512;
    }
    return 300;
  }
  get bannerImage(): string | null {
    if (this.isMfaDemo()) {
      if (window.innerWidth < 450) {
        return 'assets/img/mfa-narrow.jpg';
      }
      return 'assets/img/mfa.jpg';
    }
    return 'assets/img/Agilicus-Horizontal.svg';
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

  private decodeToken(token: string): object {
    let decoded = {};
    if (token) {
      decoded = jwt_decode(token);
    }
    return decoded;
  }
  public getAccessToken(): object {
    return this.decodeToken(this.auth.access_token());
  }

  public getIdToken(): object {
    return this.decodeToken(this.auth.id_token());
  }
}
