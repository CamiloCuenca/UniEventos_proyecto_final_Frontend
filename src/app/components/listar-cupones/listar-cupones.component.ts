import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../services/coupon.service';
import { CouponDTO } from '../../interface/cupon.dto';

@Component({
  selector: 'app-listar-cupones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cupones.component.html',
  styleUrls: ['./listar-cupones.component.css']
})
export class ListarCuponesComponent implements OnInit {
  @Input() isAvailable: boolean = true; // Define si muestra cupones disponibles o no disponibles
  cupones: CouponDTO[] = [];
  title: string = 'Listado de Cupones';

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
      (cupones) => (this.cupones = cupones),
      (error) => console.error('Error al cargar cupones disponibles:', error)
    );
  }

  private cargarCuponesNoDisponibles(authToken: string) {
    this.couponService.getUnavailableCoupons(authToken).subscribe(
      (cupones) => (this.cupones = cupones),
      (error) => console.error('Error al cargar cupones no disponibles:', error)
    );
  }

  onActivar(cupon: CouponDTO) {
    console.log('Activar cupon:', cupon);
  }

  onDesactivar(cupon: CouponDTO) {
    console.log('Desactivar cupon:', cupon);
  }

  onEditar(cupon: CouponDTO) {
    console.log('Editar cupon:', cupon);
  }
}
