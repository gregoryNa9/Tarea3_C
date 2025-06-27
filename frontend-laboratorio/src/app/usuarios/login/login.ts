import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService } from '../usuarios';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  id = '';

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.usuariosService.obtener(this.id).subscribe({
      next: (usuario: any) => {
        console.log('Respuesta usuario:', usuario);
        // Si la respuesta tiene un body anidado, usar ese objeto
        const user = usuario.body ? usuario.body : usuario;
        if (!user || !user.rol) {
          alert('Usuario o rol no válido.');
          return;
        }
        this.authService.login(user);
        if (user.rol === 'docente') {
          this.router.navigate(['/docentes/ver-asignaturas']);
        } else if (user.rol === 'estudiante') {
          this.router.navigate(['/estudiante']);
        } else {
          alert('Rol desconocido: ' + user.rol);
        }
      },
      error: () => {
        alert('ID o usuario no encontrado.');
      }
    });
  }
}
