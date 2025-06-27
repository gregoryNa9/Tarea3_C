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
    this.usuariosService.obtener(this.id).subscribe((usuario: any) => {
      this.authService.login(usuario);
      const ruta = usuario.rol === 'docente' ? '/docente' : '/estudiante';
      this.router.navigate([ruta]);
    });
  }
}
