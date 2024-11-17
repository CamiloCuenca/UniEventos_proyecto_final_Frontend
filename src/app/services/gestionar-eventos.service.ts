import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventDTO } from '../interface/event.dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarEventosService {
  private apiUrl = 'https://unieventos-proyecto-final-backend-49t8.onrender.com/api/administrador'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para crear un evento
  createEvent(eventData: EventDTO, headers?: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/crear-evento`;
    return this.http.post(url, eventData, { headers });
  }

   // Método para obtener la lista de eventos
  getEvents(headers?: HttpHeaders): Observable<EventDTO[]> {
    const url = `${this.apiUrl}/obtener-eventos`;
    return this.http.get<{ error: boolean; respuesta: EventDTO[] }>(url, { headers }).pipe(
      map(response => response.respuesta)
    );
  }
  deleteEvent(eventId: string, headers: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-evento/${eventId}`, { headers });
  }

  uploadImage(imageData: FormData) {
    return this.http.post<{ error: boolean, respuesta: string }>('https://unieventos-proyecto-final-backend-49t8.onrender.com/api/imagenes/upload-image', imageData);
  }

  // Método para actualizar un evento
  updateEvent(updatedEvent: EventDTO, authToken: string): Observable<string> {
    const url = `${this.apiUrl}/editar-evento`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json' // Asegúrate de tener este encabezado
    });

    return this.http.put<{ error: boolean, respuesta: string }>(url, updatedEvent, { headers })
      .pipe(
        map(response => {
          if (!response.error) {
            return response.respuesta;
          } else {
            throw new Error('Error en la actualización del evento.');
          }
        }),
        catchError((error) => {
          console.error('Error al actualizar el evento:', error);
          if (error.error) {
            console.error('Detalles del error:', error.error); // Imprime los detalles del error
          }
          return throwError(() => new Error('Error al actualizar el evento.'));
        })
      );
  }



}
