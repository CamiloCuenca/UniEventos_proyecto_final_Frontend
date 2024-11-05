import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDTO } from '../interface/login.dto';
import { TokenDTO } from '../interface/token.dto';
import { ProfileDTO } from '../interface/profileDTO';
import { UpdatedPassword } from '../interface/updatePassword';
import { TokenService } from './token.service';

interface LoginResponse {
  error: boolean;
  respuesta: TokenDTO; // Aquí especificamos que 'respuesta' es de tipo TokenDTO
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';



  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUserProfile(): Observable<ProfileDTO> {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const userId = this.tokenService.getIDCuenta(); // Usa `getIDCuenta` para obtener el id
        return this.http.get<ProfileDTO>(`${this.apiUrl}/cliente/cuenta/obtener-info/${userId}`).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError('Error al obtener la información del perfil');
          })
        );
      } catch (error) {
        return throwError('Error al decodificar el token');
      }
    }
    return throwError('No se encontró el token');
  }



  updateUserProfile(updatedProfile: ProfileDTO): Observable<ProfileDTO> {
    const userId = this.tokenService.getIDCuenta(); // Extrae el userId desde el token
    const url = `${this.apiUrl}/cliente/cuenta/editar-perfil/${userId}`;
    return this.http.put<ProfileDTO>(url, updatedProfile).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Error al actualizar el perfil');
      })
    );
  }
  updatePassword(updatedPassword: UpdatedPassword): Observable<UpdatedPassword> {
    const userId = this.tokenService.getIDCuenta(); // Extrae el userId desde el token
    const url = `${this.apiUrl}/cliente/cuenta/editar-password/${userId}`;
    return this.http.put<UpdatedPassword>(url, updatedPassword).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Error al actualizar la contraseña');
      })
    );
  }

  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/cliente/email/enviar-codigo/${correo}`, {});
}
  

  iniciarSesion(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/cuenta/iniciar-sesion`, loginData);
  }


  crearCuenta(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
}

