import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearEventoComponent } from '../../components/crear-evento/crear-evento.component';
import { ListarEventosComponent } from '../../components/listar-eventos/listar-eventos.component';
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';

@Component({
  selector: 'app-gestionar-eventos',
  standalone: true,
  imports: [CrearEventoComponent, ListarEventosComponent, CommonModule, RouterModule,AdminCardComponent],
  templateUrl: './gestionar-eventos.component.html',
  styleUrls: ['./gestionar-eventos.component.css']
})
export class GestionarEventosComponent implements OnInit {
  isCreatingEvent = false;
  isListingEvents = false;

  ngOnInit(): void {
    // Aquí puedes inicializar variables o realizar otras configuraciones iniciales si es necesario.
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
    }
  }
}
