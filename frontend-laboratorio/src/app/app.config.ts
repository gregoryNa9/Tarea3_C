import { provideRouter } from '@angular/router';
import { RegistroComponent } from './usuarios/registro/registro';
import { LoginComponent } from './usuarios/login/login';

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]),
    provideHttpClient()
  ]
};
