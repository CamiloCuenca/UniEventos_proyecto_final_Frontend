import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginDTO } from '../interface/login.dto';
import { TokenDTO } from '../interface/token.dto';
import { ProfileDTO } from '../interface/profileDTO';
import { UpdatedPassword } from '../interface/updatePassword';

interface LoginResponse {
  error: boolean;
  respuesta: TokenDTO; // Aquí especificamos que 'respuesta' es de tipo TokenDTO
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private apiUrlC = 'http://localhost:8080/api/auth/cuenta/crear-cuenta'; // URL de tu API

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<ProfileDTO> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload: any = jwtDecode(token); // Decodificar el token
        const userId = payload.id; // Obtener el userId del payload

        // Hacer la solicitud usando el id extraído del token
        return this.http.get<ProfileDTO>(`${this.apiUrl}/obtener-info/${userId}`);
      } catch (error) {
        return throwError('Error al decodificar el token');
      }
    }
    return throwError('No se encontró el token');
  }


  updateUserProfile(updatedProfile: ProfileDTO, userId: string): Observable<ProfileDTO> {
    const url = `${this.apiUrl}/cliente/cuenta/editar-perfil/${userId}`;
    return this.http.put<ProfileDTO>(url, updatedProfile);
  }

  updatePassword(updatedPassword: UpdatedPassword, userId: string): Observable<UpdatedPassword> {
    return this.http.put<UpdatedPassword>(`${this.apiUrl}/cliente/cuenta/editar-password/${userId}`, updatedPassword);
  }


  public decodeToken(token: string) {
    try {
        const payload = jwtDecode(token); // Utilizar la librería para decodificar el token
        return payload; // Devolver el payload decodificado
    } catch (e) {
        throw new Error('Token inválido');
    }
}

  iniciarSesion(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/cuenta/iniciar-sesion`, loginData);
  }


  crearCuenta(datos: any): Observable<any> {
    return this.http.post(this.apiUrlC, datos);
  }
}

function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}
