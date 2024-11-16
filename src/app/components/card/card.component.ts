import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'
import { CartModalComponent } from "../cart-modal/cart-modal.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CartModalComponent],
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
  modalVisible: boolean = false; // Controla la visibilidad del modal

  // Método para abrir el modal
  openCartModal() {
    this.modalVisible = true;
  }

  // Método para cerrar el modal
  closeCartModal() {
    this.modalVisible = false;
  }
}
