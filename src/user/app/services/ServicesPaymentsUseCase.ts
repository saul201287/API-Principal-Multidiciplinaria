import { PaymentServices } from "../../infraestructura/servicesPayments/PaymentsServices";
import { ICreateId } from "./ICreateId";


export class ServicesPaymentsUseCase {
  constructor(
    readonly paymentServices: PaymentServices,
    readonly createId: ICreateId
  ) {}
  async run(
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
  ): Promise<string | object> {
    try {
      id = await this.createId.asignarId();
      const result = await this.paymentServices.makePayment(
        id.split("-").toString(),
        concepto,
        importe,
        ntarjeta,
        persona,
        telefono,
        correo,
        paquete,
        cvv,
        Fvencimiento,
        iduser
      );
      return result;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
