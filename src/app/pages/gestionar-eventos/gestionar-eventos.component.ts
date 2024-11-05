import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearEventoComponent } from '../../components/crear-evento/crear-evento.component';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO } from '../../interface/event.dto';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gestionar-eventos',
  standalone: true,
  imports: [CrearEventoComponent, CommonModule, RouterModule],
  templateUrl: './gestionar-eventos.component.html',
  styleUrls: ['./gestionar-eventos.component.css']
})
export class GestionarEventosComponent implements OnInit {
  isCreatingEvent = false;
  isListingEvents = false;
  events: EventDTO[] = [];

  constructor(private eventService: GestionarEventosService) {}

  ngOnInit(): void {
    this.listEvents();
  }

  toggleCreateEvent(): void {
    this.isCreatingEvent = !this.isCreatingEvent;
    if (this.isCreatingEvent) {
      this.isListingEvents = false;
    }
  }

  toggleEventList(): void {
    this.isListingEvents = !this.isListingEvents;
    if (this.isListingEvents) {
      this.isCreatingEvent = false;
      this.listEvents(); // Recarga la lista de eventos al mostrarla
    }
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
      (events: EventDTO[]) => { // Asegúrate de que el tipo sea EventDTO[]
        this.events = events;
        console.log('Eventos obtenidos:', this.events);
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
    console.log('Eliminando evento:', event);
    this.events = this.events.filter(e => e !== event); // Elimina el evento de la lista
  }
}
