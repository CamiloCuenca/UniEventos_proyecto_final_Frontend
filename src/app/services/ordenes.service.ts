import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import {OrdenDTO,DetalleOrden,Payment,PaymentState,PaymentType} from '../interface/orden.dto'
import {localities} from '../interface/event.dto'


@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la aplicación
})
export class OrderService{
  private apiUrl = 'https://unieventos-proyecto-final-backend-49t8.onrender.com/api/orden';

  constructor(private http: HttpClient) { }


  // Método para crar una orden dec ompra
    createOrder(orderData: OrdenDTO,headers?: HttpHeaders): Observable<any> {
      const url = `${this.apiUrl}/crear-orden`;
      return this.http.post(url,orderData,{headers});
    }

}
