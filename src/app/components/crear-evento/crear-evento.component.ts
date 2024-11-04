import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO, Locality } from '../../interface/event.dto';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: GestionarEventosService) {
    this.eventForm = this.fb.group({
      coverImage: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['ACTIVE', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      imageLocalities: ['', Validators.required],
      type: ['CONCERT', Validators.required],
      date: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      localities: this.fb.array([]) // Aquí se almacenarán las localidades
    });
  }

  // Getter para el FormArray de localidades
  get localities(): FormArray {
    return this.eventForm.get('localities') as FormArray;
  }

  // Método para agregar una nueva localidad
  addLocality(): void {
    const localityForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      ticketsSold: [0, Validators.required],
      maximumCapacity: [0, [Validators.required, Validators.min(1)]]
    });
    this.localities.push(localityForm);
  }

  // Método para eliminar una localidad
  removeLocality(index: number): void {
    this.localities.removeAt(index);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent: EventDTO = this.eventForm.value;

      const token = sessionStorage.getItem('AuthToken');
      if (!token) {
        console.error('Token de autenticación no encontrado');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.eventService.createEvent(newEvent, headers).subscribe(
        response => {
          console.log('Evento creado:', response);
        },
        error => {
          console.error('Error al crear evento:', error);
        }
      );
    }
  }
}
