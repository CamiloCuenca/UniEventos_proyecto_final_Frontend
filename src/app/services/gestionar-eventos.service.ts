import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDTO } from '../interface/event.dto'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class GestionarEventosService {
  private apiUrl = 'http://localhost:8080/api/administrador/crear-evento'; // Asegúrate de que sea la URL correcta

  constructor(private http: HttpClient) {}

  createEvent(eventData: EventDTO, headers?: HttpHeaders): Observable<any> {
    return this.http.post(this.apiUrl, eventData, { headers });
  }
}
