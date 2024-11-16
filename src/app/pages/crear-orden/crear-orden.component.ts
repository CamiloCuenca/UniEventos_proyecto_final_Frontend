import { OrderService } from './../../services/ordenes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar para leer parámetros de URL
import { OrdenDTO, PaymentState, PaymentType } from '../../interface/orden.dto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {
  orderForm: FormGroup;
  paymentTypes = Object.values(PaymentType);
  paymentStates = Object.values(PaymentState);
  idEvent: string = ''; // Variable para almacenar el idEvent

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      idAccount: ['', Validators.required],
      date: ['', Validators.required],
      gatewayCode: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(1)]],
      codeCoupon: [''],
      payment: this.fb.group({
        currency: ['', Validators.required],
        typePayment: ['', Validators.required],
        authorizationCode: ['', Validators.required],
        date: ['', Validators.required],
        transactionValue: [0, [Validators.required, Validators.min(1)]],
        state: ['pending', Validators.required] // Estado por defecto
      }),
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Obtener idEvent de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.idEvent = params['idEvent'] || '';
      if (this.idEvent) {
        this.addItemWithId(this.idEvent);
      }
    });

    // Obtener idAccount del token
    const token = sessionStorage.getItem('AuthToken');
    if (token) {
      const accountId = this.extractIdFromToken(token);
      this.orderForm.patchValue({ idAccount: accountId });
    }
  }

  extractIdFromToken(token: string): string {
    return TokenService.prototype.getIDCuenta();
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItemWithId(idEvent: string) {
    const itemGroup = this.fb.group({
      idEvent: [idEvent, Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      localityName: ['', Validators.required],
      EventName: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemGroup);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const newOrder: OrdenDTO = this.orderForm.value;
      console.log('Order submitted:', newOrder);

      const token = sessionStorage.getItem('AuthToken');
      if (!token) {
        console.error('Token de autenticación no encontrado');
        Swal.fire({
          icon: 'warning',
          title: 'Autenticación',
          text: 'Token de autenticación no encontrado',
          showConfirmButton: true
        });
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.orderService.createOrder(newOrder, headers).subscribe(
        response => {
          console.log('Orden creada:', response);
          Swal.fire({
            icon: 'success',
            title: 'Orden creada',
            text: 'La orden se creó con éxito',
            showConfirmButton: true
          });
        },
        error => {
          console.error('Error al crear la orden:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear la orden',
            showConfirmButton: true
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos',
        showConfirmButton: true
      });
    }
  }
}
