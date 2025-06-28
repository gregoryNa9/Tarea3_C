import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Practica {
  id: string;
  nombre: string;
  descripcion?: string;
  fechaLimite: string;
  docenteId: string;
}

@Component({
  selector: 'app-crear-practica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-practica.html',
  styleUrls: ['./crear-practica.css']
})
export class CrearPracticaComponent implements OnInit {
  practicaForm: FormGroup;
  practicas: Practica[] = [];
  docenteId: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.practicaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fechaLimite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuarioStr = localStorage.getItem('usuario');
      let usuario: any = null;
      try {
        usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      } catch (e) {
        usuario = null;
      }
      this.docenteId = usuario && usuario.id ? usuario.id : '';

      if (this.docenteId) {
        this.cargarPracticas();
      }
    } else {
      // Si no hay localStorage (por ejemplo, en SSR), no hacer nada o asignar un valor por defecto
      this.docenteId = '';
    }
  }

  cargarPracticas() {
    const url = `https://o81leawoc8.execute-api.us-east-1.amazonaws.com/practicas/docente/${this.docenteId}`;
    this.http.get<Practica[]>(url).subscribe({
      next: data => {
        this.practicas = data;
      },
      error: err => {
        console.error('Error al cargar prácticas:', err);
        alert('Error al cargar prácticas');
      }
    });
  }

  onSubmit() {
    if (this.practicaForm.valid) {
      console.log('Datos que se enviarán:', this.practicaForm.value);
      const nuevaPractica = {
        ...this.practicaForm.value,
        docenteId: this.docenteId
      };
      // Depuración: mostrar el valor de fechaLimite antes de enviar
      console.log('Fecha límite enviada:', nuevaPractica.fechaLimite);
      this.http.post('https://o81leawoc8.execute-api.us-east-1.amazonaws.com/practicas', nuevaPractica).subscribe({
        next: (resp: any) => {
          alert('Práctica creada con éxito');
          this.practicaForm.reset();
          this.cargarPracticas();
        },
        error: err => {
          console.error('Error al crear práctica:', err);
          alert('Error al crear práctica');
        }
      });
    }
  }

  formatoFecha(fechaISO: string): string {
    if (!fechaISO) return '-';
    // Soporta tanto fechas tipo 'YYYY-MM-DD' como ISO completas
    // Si viene con hora, la recorta
    const soloFecha = fechaISO.split('T')[0];
    const partes = soloFecha.split('-');
    if (partes.length === 3) {
      // Devuelve en formato dd/mm/yyyy
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return fechaISO;
  }

  regresarPanelDocente() {
    this.router.navigate(['/docentes']);
  }
}
