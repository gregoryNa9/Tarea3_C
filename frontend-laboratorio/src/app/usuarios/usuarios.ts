import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private apiUrl = 'https://o81leawoc8.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {}

  registrar(usuario: any) {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  obtener(id: string) {
    return this.http.get(`${this.apiUrl}/usuario/${id}`);
  }
}
