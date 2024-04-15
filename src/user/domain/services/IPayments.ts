export interface IPayments {
  makePayment(
    id: string,
    concepto: string,
    importe: number,
    ntarjeta: number,
    persona: string,
    telefono: number,
    correo: string,
    paquete: number,
    cvv: number,
    Fvencimiento: Date,
    iduser: string
  ): Promise<object | string>;
}
