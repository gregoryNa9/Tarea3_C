import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService } from '../usuarios'; // 👈 Corregido: importar desde usuarios.ts

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    correo: '',
    rol: 'estudiante'
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  registrar() {
    this.usuariosService.registrar(this.usuario).subscribe(() => {
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    });
  }
}
