import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reporteservice {
  private apiUrl = 'https://unieventos-proyecto-final-backend-49t8.onrender.com/api/administrador';

  constructor(private http: HttpClient) {}

  // Método para generar el reporte
  generarReporte(headers: HttpHeaders): Observable<Blob> {
    const url = `${this.apiUrl}/reporte`;
    return this.http.post(url, {}, { headers, responseType: 'blob' }); // Especificar responseType como 'blob'
  }
}
