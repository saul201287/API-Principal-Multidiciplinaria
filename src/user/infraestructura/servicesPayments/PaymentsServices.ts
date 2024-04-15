import { query } from "../../../database/mysql";
import { IPayments } from "../../domain/services/IPayments";

export class PaymentServices implements IPayments {
  async makePayment(
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
      const body = [
        id,
        concepto,
        importe,
        ntarjeta,
        persona,
        telefono,
        correo,
        paquete,
        cvv,
        Fvencimiento,
        iduser,
      ];
      let time = "00:00:00";
      if (paquete == 1) time = "24:00:00";
      else if ((paquete = 2)) time = "168:00:00";
      else if ((paquete = 3)) time = "720:00:00";
      else if ((paquete = 4)) time = "8760:00:00";
      const sql2 =
        "UPDATE users SET duracion = ADDTIME(duracion, ? )WHERE id = ?";
      const data2 = await query(sql2, [time, iduser]);

      const sql =
        "INSERT INTO pagos (id,concepto,cantidad,numerodetarjeta, personafisica,telefono, correo, paquete,cvv, fechadevencimiento,iduser) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      const data: any = await query(sql, body);
      const result = Object.values(JSON.parse(JSON.stringify(data)));
      return result;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
