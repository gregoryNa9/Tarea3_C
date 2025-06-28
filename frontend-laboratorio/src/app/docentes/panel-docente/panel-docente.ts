
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-docente',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './panel-docente.html',
  styleUrls: ['./panel-docente.css']
})
export class PanelDocenteComponent {
  nombre: string = '';
  constructor(private authService: AuthService, private router: Router) {
    const usuario = this.authService.getUsuarioActual();
    this.nombre = usuario?.nombre || '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
