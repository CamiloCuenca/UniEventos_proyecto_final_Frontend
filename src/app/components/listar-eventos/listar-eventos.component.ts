import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO } from '../../interface/event.dto';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  events: EventDTO[] = [];

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
