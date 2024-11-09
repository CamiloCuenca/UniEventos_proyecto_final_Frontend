import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CouponDTO } from '../interface/cupon.dto'; // Asegúrate de tener la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/administrador'; // La URL base de tu API

  constructor(private http: HttpClient) {}

   // Método para crear un cupón
   createCoupon(coupon: CouponDTO, authToken: string): Observable<any> {
    const url = `${this.apiUrl}/crear-cupon`; // URL de creación del cupón
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}` // Agregar el token en los headers
    });

    return this.http.post(url, coupon, { headers });
  }

  // Método para obtener cupones disponibles
  getAvailableCoupons(authToken: string): Observable<CouponDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<{ error: boolean, respuesta: CouponDTO[] }>(`${this.apiUrl}/cupones/disponibles`, { headers })
      .pipe(
        map(response => response.respuesta), // Extrae la propiedad `respuesta`
        catchError((error) => {
          console.error('Error al obtener cupones disponibles:', error);
          return throwError(() => new Error('Error al obtener cupones disponibles'));
        })
      );
  }


  // Método para obtener cupones no disponibles
  getUnavailableCoupons(authToken: string): Observable<CouponDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<{ error: boolean, respuesta: CouponDTO[] }>(`${this.apiUrl}/cupones/no-disponibles`, { headers })
      .pipe(
        map(response => response.respuesta),
        catchError((error) => {
          console.error('Error al obtener cupones no disponibles:', error);
          return throwError(() => new Error('Error al obtener cupones no disponibles'));
        })
      );
  }

}
