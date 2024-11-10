import { CouponStatus } from "./enum/CouponStatus";
import { TypeCoupon } from "./enum/TypeCoupon";


export interface listaCuponDTO {
  couponId: string;
  name: string ;
  code: string ;
  discount: string;
  expirationDate: string;  // Cambiado a 'string'
  status: CouponStatus;
  type: TypeCoupon;
  eventId: string | null;
  startDate: string;  // Cambiado a 'string'
}
