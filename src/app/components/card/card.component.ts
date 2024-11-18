import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'
import { CartModalComponent } from "../cart-modal/cart-modal.component";
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { cartDetailDTO, Localities } from '../../interface/cartDetailDTO';


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
  @Input() eventId: string = ''; // ID del evento
  modalVisible: boolean = false; // Controla la visibilidad del modal
  selectedEventId: string | null = null; // ID del evento actualmente seleccionado
  selectedLocality: Localities = Localities.VIP; // Valor predeterminado para localidad
  quantity: number = 1; // Cantidad de boletos predeterminada

  constructor(private authService: AuthService) {}

  // Método para abrir el modal
  openCartModal(eventId: string): void {
    this.selectedEventId = eventId;
    this.modalVisible = true;
  }

  // Método para cerrar el modal
  closeCartModal(): void {
    this.modalVisible = false;
    this.selectedEventId = null; // Resetea el ID del evento seleccionado
  }

  // Método para enviar el formulario y agregar el ítem al carrito
  onSubmit() {
    const accountId = TokenService.getIDCuenta; // Obtén el ID de la cuenta del usuario autenticado
    const cartDetailDTO: cartDetailDTO = {
        eventId: this.selectedEventId!,
        localites: this.selectedLocality, // Nota: Asegúrate de que coincida con el nombre del campo en la interfaz
        quantity: this.quantity
    };

    this.authService.addItemToCart(accountId, cartDetailDTO).subscribe(
        (response) => {
            console.log('Ítem agregado al carrito:', response);
            this.closeCartModal(); // Cierra el modal después de agregar al carrito
        },
        (error) => {
            console.error('Error al agregar al carrito:', error);
        }
    );
  }
}
