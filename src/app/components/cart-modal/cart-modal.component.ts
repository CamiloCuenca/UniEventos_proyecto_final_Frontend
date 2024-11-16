import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Input() isVisible: boolean = false; // Propiedad para controlar la visibilidad
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  selectedLocality: string = '';
  quantity: number = 1;

  // Método para cerrar el modal
  closeModal() {
    this.close.emit(); // Emitimos el evento 'close' para el componente padre
  }

  // Método de envío del formulario
  onSubmit() {
    console.log('Localidad seleccionada:', this.selectedLocality);
    console.log('Cantidad de boletos:', this.quantity);
    this.closeModal(); // Cierra el modal después de enviar
  }
}
