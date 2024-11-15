// event.dto.ts

export enum EventType {
  DEPORT = 'DEPORT',
  CONCERT = 'CONCERT',
  CULTURAL = 'CULTURAL',
  BEAUTY = 'BEAUTY',
  FESTIVAL = 'FESTIVAL',
  GALA = 'GALA',
  CONFERENCE = 'CONFERENCE',
  FAIR = 'FAIR'
}

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum localities {
  VIP = "VIP",
  GENERAL = "GENERAL"
}

export enum EventCity {

  BOGOTA = "BOGOTA",
  MEDELLIN = "MEDELLIN",
  CALI = "CALI",
  BARRANQUILLA = "BARRANQUILLA",
  CARTAGENA = "CARTAGENA",
  CUCUTA = "CUCUTA",
  BUCARAMANGA = "BUCARAMANGA",
  IBAGUE = "IBAGUE",
  SANTA_MARTA = "SANTA_MARTA",
  MANIZALES = "MANIZALES",
  PEREIRA = "PEREIRA",
  VILLAVICENCIO = "VILLAVICENCIO",
  MONTERIA = "MONTERIA",
  PASTO = "PASTO",
  NEIVA = "NEIVA",
  ARMENIA = "ARMENIA",
  SINCELEJO = "SINCELEJO",
  VALLEDUPAR = "VALLEDUPAR",
  RIOHACHA = "RIOHACHA",
  POPAYAN = "POPAYAN"


export interface Locality {
  price: number;
  name: localities;
  ticketsSold: number;
  maximumCapacity: number;
}

export interface EventDTO {
  id?: string; // Opcional para eventos nuevos
  coverImage: string;
  name: string;
  status: EventStatus; // Usando el enum EventStatus
  description: string;
  imageLocalities: string;
  type: EventType; // Usando el enum EventType
  date: string; // Puedes cambiar a Date si prefieres manejarlo así
  city: EventCity;
  address: string;
  amount: number;
  localities: Locality[];
}