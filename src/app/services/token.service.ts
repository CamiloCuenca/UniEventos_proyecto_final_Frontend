import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  public setToken(tokesessionStoragen: string) {
    // Corrección aquí: usar sessionStorage
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, tokesessionStoragen); // Cambiado a sessionStorage
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() !== null; // Simplificación
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/"]); // Redirigir después de iniciar sesión
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]); // Redirigir después de cerrar sesión
  }

  private decodePayload(token: string): any {
    const payload = token.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    return JSON.parse(payloadDecoded);
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id; // Suponiendo que 'id' está en el payload
    }
    return "";
  }

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol; // Suponiendo que 'rol' está en el payload
    }
    return "";
  }
}
