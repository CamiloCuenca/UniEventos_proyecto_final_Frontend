import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventDTO } from '../interface/event.dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarEventosService {
  private apiUrl = 'http://localhost:8080/api/administrador'; // URL base de la API

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
}
