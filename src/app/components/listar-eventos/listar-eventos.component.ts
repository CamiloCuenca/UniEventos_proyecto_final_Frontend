import { Component, Input, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO ,city} from '../../interface/event.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  @Input() isAvailable: boolean = true;
  events: EventDTO[] = [];
  editingEventIndex: number | null = null;

  cities = Object.values(city);


  constructor(private eventService: GestionarEventosService) {}

  ngOnInit(): void {
    this.listEvents();
  }

  listEvents(): void {
    const token = sessionStorage.getItem('AuthToken');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.eventService.getEvents(headers).subscribe(
      (events: EventDTO[]) => {
        this.events = events;
        console.log('Eventos obtenidos en el componente:', this.events); // Verifica si _id está presente
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  editEvent(event: EventDTO): void {
    console.log('Editando evento:', event);
  }


  onEditar(index: number) {
    this.editingEventIndex = index;
  }

  onGuardarEdicion(index: number) {
    const authToken = sessionStorage.getItem('AuthToken');
    if (!authToken) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    const updatedEvent = { ...this.events[index] };
    this.eventService.updateEvent(updatedEvent, authToken).subscribe(
      (message) => {
        console.log('Respuesta de la actualización:', message);
        this.editingEventIndex = null;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar el evento:', error);
      }
    );
  }

  onCancelarEdicion() {
    this.editingEventIndex = null;
  }


  deleteEvent(event: EventDTO): void {
    const token = sessionStorage.getItem('AuthToken');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (event.id && confirm(`¿Estás seguro de que deseas eliminar el evento "${event.name}"?`)) {
      this.eventService.deleteEvent(event.id, headers).subscribe(
        () => {
          console.log(`Evento ${event.name} eliminado exitosamente`);
          //this.events = this.events.filter(e => e.id !== event.id); // Actualiza la lista de eventos
        },
        (error) => {
          console.error(`Error al eliminar el evento ${event.name}:`, error);
        }
      );
    } else {
      console.error('ID del evento no encontrado.');
    }
  }


}
