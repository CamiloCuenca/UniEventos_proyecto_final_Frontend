import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemEventDTO } from '../../interface/item-event-dto'; // Ruta al DTO
import { CarrucelComponent } from '../../components/carrucel/carrucel.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { PaginadorComponent } from '../../components/paginador/paginador.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { EventFilterComponentComponent } from "../../components/event-filter-component/event-filter-component.component";
import { EventFilter } from '../../interface/EventFilter';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarrucelComponent, CardComponent, CommonModule, PaginadorComponent, FooterComponent, SearchBarComponent, EventFilterComponentComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  events: ItemEventDTO[] = []; // Inicializa como un array vacío

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents(); // Cargar eventos al iniciar
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        console.log(data);
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  // Nuevo método para actualizar los eventos según el filtro
  onFilterApplied(filter: EventFilter): void {
    this.eventService.filterEvents(filter).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error applying filter', error);
      }
    );
  }
}
