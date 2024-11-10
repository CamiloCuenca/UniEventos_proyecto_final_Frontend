import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../services/coupon.service';
import { listaCuponDTO } from '../../interface/listaCupon.dto';
import { FormsModule } from '@angular/forms';
import { CouponDTO } from '../../interface/cupon.dto';

@Component({
  selector: 'app-listar-cupones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-cupones.component.html',
  styleUrls: ['./listar-cupones.component.css']
})
export class ListarCuponesComponent implements OnInit {
  @Input() isAvailable: boolean = true;
  listCupones: listaCuponDTO[] = [];
  title: string = 'Listado de Cupones';
  editingCouponIndex: number | null = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    const authToken = sessionStorage.getItem('AuthToken');
    if (authToken) {
      if (this.isAvailable) {
        this.cargarCuponesDisponibles(authToken);
        this.title = 'Cupones Disponibles';
      } else {
        this.cargarCuponesNoDisponibles(authToken);
        this.title = 'Cupones No Disponibles';
      }
    } else {
      console.error('Token de autenticación no encontrado.');
    }
  }

  private cargarCuponesDisponibles(authToken: string) {
    this.couponService.getAvailableCoupons(authToken).subscribe(
      (listCupones) => (this.listCupones = listCupones),
      (error) => console.error('Error al cargar cupones disponibles:', error)
    );
  }

  private cargarCuponesNoDisponibles(authToken: string) {
    this.couponService.getUnavailableCoupons(authToken).subscribe(
      (listCupones) => (this.listCupones = listCupones),
      (error) => console.error('Error al cargar cupones no disponibles:', error)
    );
  }

  onEditar(index: number) {
    this.editingCouponIndex = index;
  }

  onGuardarEdicion(index: number) {
    const authToken = sessionStorage.getItem('AuthToken');
    if (!authToken) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    const updatedCoupon = { ...this.listCupones[index] };
    this.couponService.updateCoupon(updatedCoupon, authToken).subscribe(
      (message) => {
        console.log('Respuesta de la actualización:', message);
        this.editingCouponIndex = null;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al actualizar el cupón:', error);
      }
    );
  }

  onCancelarEdicion() {
    this.editingCouponIndex = null;
  }


  onActivar(index: number) {

    const authToken = sessionStorage.getItem('AuthToken');
    if (!authToken) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    const activeCupon = { ...this.listCupones[index] };
    this.couponService.activateCupon(activeCupon,authToken).subscribe(
      (message) => {
        console.log('Respuesta de la activacion:', message);
        this.editingCouponIndex = null;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al activar el cupón:', error);
      }
    );

  }

  onDesactivar(index: number) {
    const authToken = sessionStorage.getItem('AuthToken');
    if (!authToken) {
      console.error('Token de autenticación no encontrado.');
      return;
    }

    const activeCupon = { ...this.listCupones[index] };
    this.couponService.desactivateCupon(activeCupon,authToken).subscribe(
      (message) => {
        console.log('Respuesta de la activacion:', message);
        this.editingCouponIndex = null;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al desactivar el cupón:', error);
      }
    );
  }
}
