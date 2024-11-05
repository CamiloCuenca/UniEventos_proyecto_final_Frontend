import { ErrorResponse } from "./ErrorResponse";

export interface MessageDTO<T> {
    error: boolean;            // Indica si ocurrió un error
    respuesta: T;              // Datos de la respuesta
    errorResponse?: ErrorResponse | null; // Información sobre el error (opcional)
}