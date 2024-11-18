
export enum Localities {
    VIP = "VIP",
    GENERAL = "GENERAL"
  }


export interface cartDetailDTO {
    eventId: String,
    localites: Localities, // Cambiar a "localite" si es lo esperado
    quantity: number
}