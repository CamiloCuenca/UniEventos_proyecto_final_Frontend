import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventFilter } from '../../interface/EventFilter';
import { EventCity, EventStatus, EventType } from '../../interface/event.dto';
import { EventService } from '../../services/event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-filter-component',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './event-filter-component.component.html',
  styleUrl: './event-filter-component.component.css'
})
export class EventFilterComponentComponent {

  @Output() filterApplied = new EventEmitter<EventFilter>();  // Nuevo EventEmitter

  filter: EventFilter = {
    name: '',
    city: undefined,
    type: undefined,  // Valor por defecto para tipo de evento
    status: undefined,
    date: undefined
  };

  eventCities = Object.values(EventCity);
  eventTypes = Object.values(EventType);
  eventStatuses = Object.values(EventStatus);

  constructor(private eventService: EventService) {}

  onFilter() {
    this.filterApplied.emit(this.filter);  // Emite el filtro al componente padre
  }

   // Método para reiniciar los filtros
   resetFilters() {
    this.filter = {
      name: '',
      city: undefined,  // Restablecer al valor por defecto
      type: undefined,
      status: undefined,
      date: undefined
    };
  }




}
