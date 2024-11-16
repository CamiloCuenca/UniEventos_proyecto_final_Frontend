import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() eventImage: string = '';   // URL de la imagen del evento
  @Input() eventTitle: string = '';   // Título del evento
  @Input() eventCity: string = '';
  @Input() eventDate: string | null = null;  // Fecha del evento, puede ser null
  @Input() eventLocation: string | null = null;
  @Input() eventId: string = ''; // Permitir null como un valor válido
}
