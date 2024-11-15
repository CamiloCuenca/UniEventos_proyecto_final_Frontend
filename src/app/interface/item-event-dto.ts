import { EventCity} from './event.dto';  // Importar los enums desde event.dto.ts

export interface ItemEventDTO {
  idEvento: String
  /** La URL de la imagen del cartel no puede estar vacía */
  urlImagePoster: string;

  /** El nombre no puede estar vacío, y no debe exceder los 100 caracteres */
  name: string; // Máximo 100 caracteres

  city: EventCity;

  /** La fecha no puede ser nula y debe ser en el futuro */
  date: string; // Se puede usar un string para representar LocalDateTime en formato ISO 8601

  /** La dirección no debe exceder los 100 caracteres */
  address?: string | null; // Cambiar a string | null para que sea compatible
}
