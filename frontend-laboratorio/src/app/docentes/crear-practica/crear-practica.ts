import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-practica',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-practica.html',
  styleUrls: ['./crear-practica.css']
})
export class CrearPracticaComponent {
  practicaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.practicaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fechaLimite: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.practicaForm.valid) {
      this.http.post('https://o81leawoc8.execute-api.us-east-1.amazonaws.com/practicas', this.practicaForm.value).subscribe({
        next: () => alert('Práctica creada con éxito'),
        error: err => alert('Error al crear práctica')
      });
    }
  }
}
