import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.practicaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fechaLimite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.docenteId = usuario.id;

    if (this.docenteId) {
      this.cargarPracticas();
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
    console.log('Objeto final que se enviará:', nuevaPractica);
    this.http.post('https://.../practicas', nuevaPractica).subscribe( ... );
  }


      this.http.post('https://o81leawoc8.execute-api.us-east-1.amazonaws.com/practicas', nuevaPractica).subscribe({
        next: () => {
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

  // // Método para mostrar fecha en formato legible dd/mm/yyyy
  // formatoFecha(fechaISO: string): string {
  //   const date = new Date(fechaISO);
  //   return date.toLocaleDateString('es-ES');
  // }

  formatoFecha(fechaISO: string): string {
  console.log('Fecha recibida:', fechaISO);
  const date = new Date(fechaISO);
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  return date.toLocaleDateString('es-ES');
}

}
