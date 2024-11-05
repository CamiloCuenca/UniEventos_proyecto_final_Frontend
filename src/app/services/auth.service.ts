import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDTO } from '../interface/login.dto';
import { TokenDTO } from '../interface/token.dto';
import { dtoAccountInformation } from '../interface/dtoAccountInformation';
import { UpdatedPassword } from '../interface/updatePassword';
import { MessageDTO } from '../interface/MessageDTO';
import { TokenService } from './token.service';
import { editAccountDTO } from '../interface/editAccountDTO';

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

  getUserData(): Observable<MessageDTO<dtoAccountInformation>> {
    const userId = this.tokenService.getIDCuenta(); // Obtén el ID del token
    return this.http.get<MessageDTO<dtoAccountInformation>>(`http://localhost:8080/api/cliente/cuenta/obtener-/${userId}`);
  }

  editAccount(accountData: editAccountDTO, userId: string): Observable<MessageDTO<string>> {
    return this.http.put<MessageDTO<string>>(`http://localhost:8080/api/cliente/cuenta/editar-perfil/${userId}`, accountData);
  }


  /*
  updateUserProfile(updatedProfile: ProfileDTO): Observable<ProfileDTO> {
    const userId = this.tokenService.getIDCuenta(); // Extrae el userId desde el token
    const url = `http://localhost:8080/api/cliente/cuenta/editar-perfil/${userId}`;
    return this.http.put<ProfileDTO>(url, updatedProfile).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Error al actualizar el perfil');
      })
    );
  }
  updatePassword(updatedPassword: UpdatedPassword): Observable<UpdatedPassword> {
    const userId = this.tokenService.getIDCuenta(); // Extrae el userId desde el token
    const url = `http://localhost:8080/api/cliente/actualizar-contrasena/${userId}`;
    return this.http.put<UpdatedPassword>(url, updatedPassword).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Error al actualizar la contraseña');
      })
    );
  }
    /** */

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

