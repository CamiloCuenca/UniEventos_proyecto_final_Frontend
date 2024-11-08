import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CouponDTO } from '../interface/cupon.dto'; // Asegúrate de tener la ruta correcta para tu DTO

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/administrador'; // La URL base para tu API

  constructor(private http: HttpClient) {}

  // Método para crear un cupón
  createCoupon(coupon: CouponDTO, authToken: string): Observable<any> {
    const url = `${this.apiUrl}/crear-cupon`; // URL de creación del cupón
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}` // Agregar el token en los headers
    });

    return this.http.post(url, coupon, { headers });
  }
}
