import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-asignaturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-asignaturas.html',
  styleUrls: ['./ver-asignaturas.css']
})

export class VerAsignaturasComponent implements OnInit {
  asignaturas: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  regresarPanelDocente() {
    this.router.navigate(['/docentes']);
  }

  ngOnInit() {

    let usuario: any = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    }
    const docenteId = usuario.id;

    if (!docenteId) {
      console.error('No se encontró el ID del docente');
      return;
    }

    const url = `https://o81leawoc8.execute-api.us-east-1.amazonaws.com/asignaturas/docente/${docenteId}`;
    this.http.get<any[]>(url).subscribe({
      next: data => {
        console.log('Asignaturas cargadas:', data);
        this.asignaturas = data;
      },
      error: err => console.error('Error al cargar asignaturas:', err)
    });
  }
}
