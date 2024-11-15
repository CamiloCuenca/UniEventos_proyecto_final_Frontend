// event-filter.model.ts
import { EventCity, EventStatus, EventType } from './event.dto';  // Importar los enums desde event.dto.ts

export interface EventFilter {
  name?: string;
  city?: EventCity;
  type?: EventType;
  status?: EventStatus;
  date?: Date;  // Puede ser un string o un Date, dependiendo del formato que se use
}