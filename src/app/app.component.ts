import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { RbacService } from './rbac.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-angular-auth';
  constructor(private oauthService: OAuthService, private rbac: RbacService) {
    this.configureOpenIDConnect();
  }
  private configureOpenIDConnect() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: context => {
        this.rbac.getRbac(context.idToken).subscribe(
          v => {
            this.rbac.rbac = v;
          }
        );
      }
    });
  }

  public get role() {
    if (!this.rbac.rbac) {
       return null;
    }
    return this.rbac.rbac.roles['app-1'];
  }
  public get first() {
    if (!this.rbac.rbac) {
      return null;
    }
    return this.rbac.rbac.first_name;
  }
  public get last() {
    if (!this.rbac.rbac) {
      return null;
    }
    return this.rbac.rbac.last_name;
  }
  public get email() {
    if (!this.rbac.rbac) {
      return null;
    }
    return this.rbac.rbac.email;
  }
  public get provider() {
    if (!this.rbac.rbac) {
      return null;
    }
    return this.rbac.rbac.provider;
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.rbac.logout();
    this.oauthService.logOut();
  }

}
