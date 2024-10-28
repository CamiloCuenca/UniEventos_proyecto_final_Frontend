import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../interface/login.dto';
import { TokenDTO } from '../interface/token.dto';

interface LoginResponse {
  error: boolean;
  respuesta: TokenDTO; // Aquí especificamos que 'respuesta' es de tipo TokenDTO
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  iniciarSesion(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/cuenta/iniciar-sesion`, loginData);
  }
}
