import { Request, Response } from "express";
import { PutUserUserNameUseCase } from "../../app/PutUserUsernameUseCase";

export class PutUserNameController {
  constructor(readonly putUserUseCase: PutUserUserNameUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log(data);
    
    try {
      const user = await this.putUserUseCase.run(
        data.username,
        data.usernamenew
      );
      if (typeof user !=="string")
        res.status(201).send({
          status: "success",
          message:"Nombre de usuario editado corretamente"
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
