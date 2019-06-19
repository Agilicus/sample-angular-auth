## sample-angular-auth

This shows how, from a blank Angular application (e.g. 'ng new sample-angular-auth')
we arrived at one with OpenID Connect and RBAC control.

1. `npm i --save angular-oauth2-oidc`
2. Add simple html to `app.component.html`
3. Add OAuthService to app.component.ts, app.module.ts
4. Update/Edit auth.config (consider using an `environment`)
5. Add interceptor, httpclientmodule to app.module.ts
6. Add `npm i --save short-uuid`


# SampleAngularAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
