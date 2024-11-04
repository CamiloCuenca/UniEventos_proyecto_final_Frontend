// event.dto.ts
export interface Locality {
  price: number;
  name: string;
  ticketsSold: number;
  maximumCapacity: number;
}

export interface EventDTO {
  _id?: string; // Optional for new events
  coverImage: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE'; // Puedes usar un enum si lo prefieres
  description: string;
  imageLocalities: string;
  type: 'CONCERT' | 'FAIR' | 'FESTIVAL' | 'CONFERENCE'; // O usa un enum
  date: string; // Se puede cambiar a Date si prefieres manejarlo así
  city: string;
  address: string;
  amount: number;
  localities: Locality[];
}
