import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'usuario';

  login(usuario: any) {
    localStorage.setItem(this.key, JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem(this.key);
  }

  getUsuarioActual() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  getRol() {
    return this.getUsuarioActual()?.rol;
  }
}
