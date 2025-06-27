import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-asignaturas',
  standalone: true,
  templateUrl: './ver-asignaturas.html',
  styleUrls: ['./ver-asignaturas.css']
})
export class VerAsignaturasComponent implements OnInit {
  asignaturas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://o81leawoc8.execute-api.us-east-1.amazonaws.com/asignaturas').subscribe({
      next: data => this.asignaturas = data,
      error: err => console.error('Error al cargar asignaturas', err)
    });
  }
}
