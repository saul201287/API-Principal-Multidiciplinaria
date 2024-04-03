import { Request, Response } from "express";
import { PutUserPasswordUseCase } from "../../app/PutUserPasswordUseCase";

export class PutUserController {
  constructor(readonly putUserUseCase: PutUserPasswordUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.putUserUseCase.run(
        data.username,
        data.password,
        data.newPassword
      );
      if (typeof user !=="string")
        res.status(301).send({
          status: "success",
          message:"Contraseña editada corretamente"
          },
        );
      else
        res.status(400).send({
          status: "ocurrio un error",
          data: user,
        });
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        mesagges: error,
      });
    }
  }
}
