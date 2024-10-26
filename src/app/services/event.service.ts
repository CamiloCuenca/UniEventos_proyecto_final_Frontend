import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemEventDTO } from '../components/interface/item-event-dto'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la aplicación
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/auth/evento/listar-eventos';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<ItemEventDTO[]> {
    return this.http.get<ItemEventDTO[]>(this.apiUrl);
  }
}
