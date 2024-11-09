import { Component } from '@angular/core';
import { CouponDTO } from '../../interface/cupon.dto';
import { CouponService } from '../../services/coupon.service';
import { CouponStatus } from '../../interface/enum/CouponStatus';
import { TypeCoupon } from '../../interface/enum/TypeCoupon';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-cupon.component.html',
  styleUrls: ['./crear-cupon.component.css']
})
export class CrearCuponComponent {
  cupon: CouponDTO = {
    name: '',
    code: '', // Deja el código vacío para que el backend lo maneje
    discount: '',
    expirationDate: '',
    status: CouponStatus.AVAILABLE,
    type: TypeCoupon.MULTIPLE,
    eventId: '', // Puede ser null o un string vacío, según lo necesites
    startDate: '',
  };

  // Opciones para el estado del cupón y tipo de cupón
  CouponStatus = CouponStatus;
  TypeCoupon = TypeCoupon;

  constructor(private couponService: CouponService) {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.isFormValid()) {
      const authToken = sessionStorage.getItem('AuthToken'); // O el método adecuado para obtener el token

      if (!authToken) {
        this.showError('No se encontró el token de autenticación.');
        return;
      }

      // Asegurarse de que las fechas estén en el formato correcto (ISO 8601)
      if (this.cupon.expirationDate && this.cupon.startDate) {
        const expirationDate = new Date(this.cupon.expirationDate);
        const startDate = new Date(this.cupon.startDate);

        if (expirationDate.toString() !== 'Invalid Date' && startDate.toString() !== 'Invalid Date') {
          this.cupon.expirationDate = expirationDate.toISOString();
          this.cupon.startDate = startDate.toISOString();
        } else {
          this.showError('Las fechas no son válidas.');
          return;
        }
      }

      // Validar el campo eventId antes de enviarlo
      if (!this.cupon.eventId || this.cupon.eventId.trim() === '') {
        this.cupon.eventId = null; // Usar undefined en lugar de null si es necesario
      }

      this.couponService.createCoupon(this.cupon, authToken).subscribe(
        (response) => {
          console.log('Cupón creado con éxito:', response);
          this.showSuccess('El cupón fue creado con éxito.');
          this.resetForm(); // Limpiar el formulario después de un envío exitoso
        },
        (error: HttpErrorResponse) => {
          console.error('Error al crear el cupón:', error);
          this.showError(error.message || 'Hubo un error al crear el cupón.');
        }
      );
    } else {
      this.showError('Por favor, complete el formulario correctamente.');
    }
  }

  // Validación básica para asegurar que los campos del formulario son válidos
  private isFormValid(): boolean {
    return (
      this.cupon.name.trim() !== '' &&
      this.cupon.discount.trim() !== '' &&
      this.cupon.expirationDate.trim() !== '' &&
      this.cupon.startDate.trim() !== ''
    );
  }

  // Método para limpiar el formulario después de un envío exitoso
  private resetForm() {
    this.cupon = {
      name: '',
      code: '', // El código se mantiene vacío para que el backend lo maneje
      discount: '',
      expirationDate: '',
      status: CouponStatus.AVAILABLE,
      type: TypeCoupon.MULTIPLE,
      eventId: '', // Mantenerlo vacío para eventos opcionales
      startDate: '',
    };
  }

  // Método para mostrar una alerta de éxito con SweetAlert2
  private showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      showConfirmButton: true
    });
  }

  // Método para mostrar una alerta de error con SweetAlert2
  private showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: message,
      showConfirmButton: true
    });
  }
}
