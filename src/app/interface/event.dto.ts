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
  city: string;
  address: string;
  amount: number;
  localities: Locality[];
}
