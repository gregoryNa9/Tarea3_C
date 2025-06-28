import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  docenteId: string;
  estudiantes?: string[];
}

interface Calificacion {
  estudianteId: string;
  nota: number;
}

interface Parcial {
  id: string;
  nombre: string;
  asignatura: string;
  calificaciones: Calificacion[];
}

interface Usuario {
  id: string;
  nombre: string;
  rol: string;
  correo: string;
}

@Component({
  selector: 'app-ver-parciales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-parciales.html',
  styleUrls: ['./ver-parciales.css']
})
export class VerParcialesComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  parciales: Parcial[] = [];
  estudiantesMap: { [id: string]: string } = {};

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
    if (!docenteId) return;

    const asigUrl = `https://o81leawoc8.execute-api.us-east-1.amazonaws.com/asignaturas/docente/${docenteId}`;
    this.http.get<Asignatura[]>(asigUrl).subscribe({
      next: asignaturas => {
        this.asignaturas = asignaturas;

        const parcUrl = `https://o81leawoc8.execute-api.us-east-1.amazonaws.com/parciales`;
        this.http.get<Parcial[]>(parcUrl).subscribe({
          next: (todos) => {
            const relacionados = todos.filter(p =>
              asignaturas.some(a => a.id === p.asignatura)
            );

            this.parciales = relacionados;

            // Obtener IDs únicos de estudiantes
            const idsEstudiantes = Array.from(new Set(
              relacionados.flatMap(p => p.calificaciones.map(c => c.estudianteId))
            ));

            // Consultar cada estudiante para obtener su nombre
            idsEstudiantes.forEach(id => {
              const url = `https://o81leawoc8.execute-api.us-east-1.amazonaws.com/usuario/${id}`;
              console.log('Consultando API para estudianteId:', id, url);
              this.http.get<{status: number, body: Usuario}>(url).subscribe({
                next: res => {
                  console.log('Respuesta API usuario:', res);
                  if(res && res.body && res.body.nombre){
                    this.estudiantesMap[id] = res.body.nombre;
                  } else {
                    this.estudiantesMap[id] = 'Nombre no disponible';
                  }
                },
                error: err => {
                  console.warn('No se encontró estudiante con ID:', id, err);
                  this.estudiantesMap[id] = 'Nombre no disponible';
                }
              });
            });
          },
          error: err => console.error('Error al cargar parciales', err)
        });
      },
      error: err => console.error('Error al cargar asignaturas', err)
    });
  }

  nombreEstudiante(id: string): string {
    return this.estudiantesMap[id] || 'Cargando...';
  }

  parcialesDe(asignaturaId: string): Parcial[] {
    return this.parciales.filter(p => p.asignatura === asignaturaId);
  }
}
