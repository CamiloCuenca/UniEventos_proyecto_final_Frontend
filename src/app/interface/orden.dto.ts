import {localities} from '../interface/event.dto'


export enum PaymentType{
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PAYPAL = "PAYPAL",
  PSE = "PSE",
  CASH = "CASH"
}

export enum PaymentState{
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
  pending ="pending",
  approved = "approved",
  authorized = "authorized",
  in_process = "in_process",
  in_mediation = "in_mediation",
  rejected = "rejected",
  cancelled = "cancelled",
  refunded = "refunded",
  charged_back = "charged_back"
}

export interface Payment{
  currency: string;
  typePayment: PaymentType;
  authorizationCode: string;
  date: string;
  transactionValue: number;
  state: PaymentState;

}


export interface DetalleOrden{
  id?: string;
  idEvent: string;
  price: number;
  localityName: localities;
  EventName: string;
  amount: number;

}


export interface OrdenDTO{

  idAccount: string;
  date: string;
  gatewayCode: string;
  items: DetalleOrden[];
  payment: Payment;
  total: number;
  codeCoupon: string;

}
