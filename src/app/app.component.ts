import { Component, OnInit } from '@angular/core';
import { Auth, TokensService, User } from 'agilicus-angular';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

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
    let clientId = 'multi-factor-authentication';
    let idp = 'https://auth.cloud.egov.city';
    if (window.location.hostname !== 'localhost') {
      clientId = window.location.hostname.split('.')[0];
      const domainSplit = window.location.hostname.split('.');
      const a1 = domainSplit.pop();
      const a2 = domainSplit.pop();
      const a3 = domainSplit.pop();
      idp = 'https://auth.' + a3 + '.' + a2 + '.' + a1;
    }
    this.auth = new Auth(clientId, idp, tokens);
  }

  public ngOnInit(): void {
    this.user$ = this.auth.user$();
  }

  private isMultiFactorAuthenticationDemo(): boolean {
    return window.location.href.search('multi-factor-authentication') !== -1 || window.location.href.search('localhost') !== -1;
  }
  get bannerWidth(): number {
    if (this.isMultiFactorAuthenticationDemo()) {
      if (window.innerWidth < 450) {
        return 300;
      }
      return 512;
    }
    return 300;
  }
  get bannerImage(): string | null {
    if (this.isMultiFactorAuthenticationDemo()) {
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
