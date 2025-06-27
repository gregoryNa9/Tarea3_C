import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { RegistroComponent } from './usuarios/registro/registro';
import { LoginComponent } from './usuarios/login/login';
import { PanelDocenteComponent } from './docentes/panel-docente/panel-docente';
import { VerAsignaturasComponent } from './docentes/ver-asignaturas/ver-asignaturas';
import { VerParcialesComponent } from './docentes/ver-parciales/ver-parciales';
import { CrearPracticaComponent } from './docentes/crear-practica/crear-practica';
import { Panel as EstudiantePanelComponent } from './estudiante/panel/panel';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'docentes', component: PanelDocenteComponent },
      { path: 'docentes/ver-asignaturas', component: VerAsignaturasComponent },
      { path: 'estudiante', component: EstudiantePanelComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]),
    provideHttpClient(withFetch()) // <-- evita advertencia NG02801
  ]
};
