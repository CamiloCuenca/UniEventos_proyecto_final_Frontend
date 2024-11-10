import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { listaCuponDTO } from '../interface/listaCupon.dto';
import { CouponDTO } from '../interface/cupon.dto';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/administrador';

  constructor(private http: HttpClient) {}

  // Método para crear un cupón
  createCoupon(coupon: CouponDTO, authToken: string): Observable<any> {
    const url = `${this.apiUrl}/crear-cupon`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post(url, coupon, { headers });
  }

  // Método para obtener cupones disponibles
  getAvailableCoupons(authToken: string): Observable<listaCuponDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<{ error: boolean, respuesta: listaCuponDTO[] }>(`${this.apiUrl}/cupones/disponibles`, { headers })
      .pipe(
        map(response => response.respuesta),
        catchError((error) => {
          console.error('Error al obtener cupones disponibles:', error);
          return throwError(() => new Error('Error al obtener cupones disponibles.'));
        })
      );
  }

  // Método para obtener cupones no disponibles
  getUnavailableCoupons(authToken: string): Observable<listaCuponDTO[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<{ error: boolean, respuesta: listaCuponDTO[] }>(`${this.apiUrl}/cupones/no-disponibles`, { headers })
      .pipe(
        map(response => response.respuesta),
        catchError((error) => {
          console.error('Error al obtener cupones no disponibles:', error);
          return throwError(() => new Error('Error al obtener cupones no disponibles.'));
        })
      );
  }

  // Método para actualizar un cupón
  updateCoupon(updatedCoupon: listaCuponDTO, authToken: string): Observable<string> {
    const url = `${this.apiUrl}/cupones/actualizar/${updatedCoupon.couponId}`; // Incluye el `id` en la URL
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.put<{ error: boolean, respuesta: string }>(url, updatedCoupon, { headers })
      .pipe(
        map(response => {
          if (!response.error) {
            return response.respuesta;
          } else {
            throw new Error('Error en la actualización del cupón.');
          }
        }),
        catchError((error) => {
          console.error('Error al actualizar el cupón:', error);
          return throwError(() => new Error('Error al actualizar el cupón.'));
        })
      );
  }
}
