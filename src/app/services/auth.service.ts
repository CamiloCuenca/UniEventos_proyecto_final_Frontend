import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDTO } from '../interface/login.dto';
import { TokenDTO } from '../interface/token.dto';
import { dtoAccountInformation } from '../interface/dtoAccountInformation';
import { MessageDTO } from '../interface/MessageDTO';
import { TokenService } from './token.service';
import { editAccountDTO } from '../interface/editAccountDTO';
import { updatePasswordDTO } from '../interface/updatePasswordDTO';

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
    return this.http.get<MessageDTO<dtoAccountInformation>>(`http://localhost:8080/api/cliente/cuenta/obtener-info/${userId}`);
  }

  editAccount(accountData: editAccountDTO, userId: string): Observable<MessageDTO<string>> {
    return this.http.put<MessageDTO<string>>(`http://localhost:8080/api/cliente/cuenta/editar-perfil/${userId}`, accountData);
  }

  updatePassword(passwordData: updatePasswordDTO, userId: string): Observable<MessageDTO<string>> {
    return this.http.put<MessageDTO<string>>(`http://localhost:8080/api/cliente/cuenta/editar-password/${userId}`, passwordData);
}

  recoverPassword(correo: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/cliente/email/enviar-codigo/${correo}`, {});
}


  iniciarSesion(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/cuenta/iniciar-sesion`, loginData);
  }


  crearCuenta(datos: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/cuenta/crear-cuenta', datos).pipe(
      catchError(this.handleError) // Captura y maneja errores
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado.';
  
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.message) {
        // Asegúrate de que el backend devuelva un mensaje en error.error.message
        errorMessage = error.error.message; // Extraer el mensaje específico del cuerpo de la respuesta
      } else {
        switch (error.status) {
          case 409: // Conflicto: Email ya existe
            errorMessage = 'El correo electrónico ya está en uso.';
            break;
          case 400: // Solicitud incorrecta: Cédula ya existe
            errorMessage = 'El número de identificación ya está en uso.';
            break;
          default:
            errorMessage = 'Error en la solicitud.';
            break;
        }
      }
    }
  
    return throwError(() => new Error(errorMessage));
  }




}

