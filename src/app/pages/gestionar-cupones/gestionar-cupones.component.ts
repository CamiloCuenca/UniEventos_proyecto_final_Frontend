import { Component } from '@angular/core';
import { CrearCuponComponent } from '../../components/crear-cupon/crear-cupon.component';
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';
import { ListarCuponesComponent } from '../../components/listar-cupones/listar-cupones.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionar-cupones',
  standalone: true,
  imports: [
    CommonModule,
    CrearCuponComponent,
    AdminCardComponent,
    ListarCuponesComponent
  ],
  templateUrl: './gestionar-cupones.component.html',
  styleUrls: ['./gestionar-cupones.component.css']
})
export class GestionarCuponesComponent {
  isCreatingCoupon = false;
  isListingCoupons = false;
  showAvailableCoupons = true;

  toggleCreateCoupon(): void {
    this.isCreatingCoupon = !this.isCreatingCoupon;
    if (this.isCreatingCoupon) {
      this.isListingCoupons = false;
    }
  }

  toggleCouponList(isAvailable: boolean): void {
    this.isListingCoupons = !this.isListingCoupons;
    this.showAvailableCoupons = isAvailable;
    if (this.isListingCoupons) {
      this.isCreatingCoupon = false;
    }
  }
}
