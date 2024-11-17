import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdenDTO } from '../../interface/orden.dto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { OrderService } from './../../services/ordenes.service';
import { EventService } from '../../services/event.service'; // Asegúrate de importar el servicio que obtiene el evento

@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {
  orderForm: FormGroup;
  idEvent: string = '';
  eventInfo: any = null; // Variable para almacenar la información del evento

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private eventService: EventService // Servicio para obtener datos del evento
  ) {
    this.orderForm = this.fb.group({
      idAccount: ['', Validators.required],
      date: ['', Validators.required],
      codeCoupon: ['', Validators.required],
      items: this.fb.array([]) // Inicialización de FormArray para los items
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idEvent = params['idEvent'] || '';
      if (this.idEvent) {
        this.loadEventInformation(this.idEvent); // Carga la información del evento
      }
    });

    const token = sessionStorage.getItem('AuthToken');
    if (token) {
      const accountId = this.extractIdFromToken(token);
      this.orderForm.patchValue({ idAccount: accountId }); // Asigna el ID de la cuenta al formulario
    }
  }

  extractIdFromToken(token: string): string {
    return TokenService.prototype.getIDCuenta(); // Método para obtener el ID de la cuenta desde el token
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray; // Obtiene el FormArray de items
  }

  loadEventInformation(id: string) {
    // Llama al servicio para obtener la información del evento
    this.eventService.getEventInformationById(id).subscribe(
      eventInfo => {
        this.eventInfo = eventInfo; // Almacena la información del evento
        this.addItemWithEventInfo(); // Agrega el item con la información del evento
      },
      error => {
        console.error('Error al cargar la información del evento:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener evento',
          text: 'No se pudo cargar la información del evento.',
          showConfirmButton: true
        });
      }
    );
  }

  addItemWithEventInfo() {
    if (!this.eventInfo) {
      return;
    }

    // Crea el formulario para cada item con la información del evento
    const itemGroup = this.fb.group({
      idEvent: [this.idEvent, Validators.required],
      price: [this.eventInfo.price, [Validators.required, Validators.min(1)]],
      localityName: ['', Validators.required],
      EventName: [this.eventInfo.name, Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]]
    });

    this.items.push(itemGroup); // Añade el item al formulario
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
