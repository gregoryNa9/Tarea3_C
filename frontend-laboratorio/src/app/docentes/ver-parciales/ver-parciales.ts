import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-parciales',
  standalone: true,
  templateUrl: './ver-parciales.html',
  styleUrls: ['./ver-parciales.css']
})
export class VerParcialesComponent implements OnInit {
  parciales: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://o81leawoc8.execute-api.us-east-1.amazonaws.com/parciales').subscribe({
      next: data => this.parciales = data,
      error: err => console.error('Error al cargar parciales', err)
    });
  }
}
