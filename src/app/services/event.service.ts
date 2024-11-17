import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemEventDTO } from '../interface/item-event-dto';
import { EventFilter } from '../interface/EventFilter';
import { EventDTO } from '../interface/event.dto';

@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la aplicación
})
export class EventService {
  private apiUrl = 'https://unieventos-proyecto-final-backend-49t8.onrender.com/api/auth/evento';

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de eventos
  getEvents(): Observable<ItemEventDTO[]> {
    return this.http.get<{ error: boolean; respuesta: ItemEventDTO[] }>(`${this.apiUrl}/listar-eventos`).pipe(
      map(response => response.respuesta) // Accede al array de eventos
    );
  }

  filterEvents(filter: EventFilter): Observable<ItemEventDTO[]> {
    let params = new HttpParams();

    // Solo agregar los parámetros que estén definidos
    if (filter.name) params = params.set('name', filter.name);
    if (filter.city) params = params.set('city', filter.city); // Aquí enviamos el enum como string
    if (filter.type) params = params.set('type', filter.type); // Aquí enviamos el enum como string
    if (filter.date) params = params.set('date', filter.date.toISOString()); // Asumimos que date es un Date
    if (filter.status) params = params.set('status', filter.status); // Aquí enviamos el enum como string

    return this.http.get<ItemEventDTO[]>('https://unieventos-proyecto-final-backend-49t8.onrender.com/api/auth/evento/filter', { params });
  }

   // Método para obtener la información del evento por su ID
   getEventInformationById(eventId: string, headers?: HttpHeaders): Observable<EventDTO> {
    const url = `${this.apiUrl}/obtener-info/${eventId}`;
    return this.http.get<{ error: boolean; respuesta: EventDTO }>(url, { headers }).pipe(
      map(response => response.respuesta), // Mapea la respuesta para obtener la información del evento
      catchError((error: any) => {
        console.error('Error al obtener información del evento:', error);
        throw error; // Re-lanza el error para que se maneje en el componente
      })
    );
  }




}
