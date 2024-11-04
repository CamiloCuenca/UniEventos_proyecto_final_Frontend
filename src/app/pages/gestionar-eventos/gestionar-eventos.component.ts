import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEventoComponent } from '../../components/crear-evento/crear-evento.component'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-gestionar-eventos',
  standalone: true,
  imports: [CrearEventoComponent,CommonModule],
  templateUrl: './gestionar-eventos.component.html',
  styleUrl: './gestionar-eventos.component.css'
})
export class GestionarEventosComponent {
  isCreatingEvent = false;

  toggleCreateEvent(): void {
    this.isCreatingEvent = !this.isCreatingEvent;
  }
}
