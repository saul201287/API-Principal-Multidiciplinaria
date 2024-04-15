import { Request, Response } from "express";
import { ServicesPaymentsUseCase } from "../../app/services/ServicesPaymentsUseCase";

export class CreatePaymentController {
  constructor(readonly servicesPayments: ServicesPaymentsUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const pay = await this.servicesPayments.run(
        data.id,
        data.concepto,
        data.importe,
        data.ntarjeta,
        data.persona,
        data.telefono,
        data.correo,
        data.paquete,
        data.cvv,
        data.Fvencimiento,
        data.iduser
      );
      if (typeof pay != "string")
        res.status(201).json({
          message: "Pago realizado",
        });
      else {
        res.status(204).json({
          error: data,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "error en el servidor",
        error: error,
      });
    }
  }
}
