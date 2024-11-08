import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reporteservice {
  private apiUrl = 'http://localhost:8080/api/administrador';

  constructor(private http: HttpClient) {}

  // Método para generar el reporte
  generarReporte(headers: HttpHeaders): Observable<Blob> {
    const url = `${this.apiUrl}/reporte`;
    return this.http.post(url, {}, { headers, responseType: 'blob' }); // Especificar responseType como 'blob'
  }
}
