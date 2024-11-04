import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemEventDTO } from '../interface/item-event-dto'; // Asegúrate de que esta ruta sea correcta


@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la aplicación
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/auth/evento'; // Cambia a la ruta correcta de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de eventos
  getEvents(): Observable<ItemEventDTO[]> {
    return this.http.get<{ error: boolean; respuesta: ItemEventDTO[] }>(`${this.apiUrl}/listar-eventos`).pipe(
      map(response => response.respuesta) // Accede al array de eventos
    );
  }


}
