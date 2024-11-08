import { Component, OnInit } from '@angular/core';
import { CrearCuponComponent } from '../../components/crear-cupon/crear-cupon.component'; // Asegúrate de que la ruta esté correcta
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionar-cupones',
  standalone: true,
  imports: [CrearCuponComponent, AdminCardComponent,CommonModule],
  templateUrl: './gestionar-cupones.component.html',
  styleUrls: ['./gestionar-cupones.component.css']
})
export class GestionarCuponesComponent implements OnInit {
  isCreatingCoupon = false;
  isListingCoupons = false;

  ngOnInit(): void {
    // Aquí puedes inicializar variables o realizar otras configuraciones iniciales si es necesario.
  }

  toggleCreateCoupon(): void {
    this.isCreatingCoupon = !this.isCreatingCoupon;
    if (this.isCreatingCoupon) {
      this.isListingCoupons = false; // Ocultar listado si se está creando un cupon
    }
  }

  toggleCouponList(): void {
    this.isListingCoupons = !this.isListingCoupons;
    if (this.isListingCoupons) {
      this.isCreatingCoupon = false; // Ocultar la creación de cupones si se está listando
    }
  }
}
