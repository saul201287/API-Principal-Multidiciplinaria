import { Request, Response } from "express";
import { PutUserUseCase } from "../../app/PutUserUseCase";

export class PutUserController {
  constructor(readonly putUserUseCase: PutUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.putUserUseCase.run(
        data.username,
        data.newPassword
      );
      if (user)
      
        res.status(201).send({
          status: "success",
          data: 
            user.map((userNew: any) => {
                return {
                    id: userNew.id,
              nombre: userNew.nombre,
              apellidoP: userNew.apellidoP,
              apellidoM: userNew.apellidoM,
              username: userNew.username,
              email: userNew.email,
              password: userNew.password,
                };
            }),
          },
        );
      else
        res.status(204).send({
          status: "error",
          data: "Usuario no encontrado",
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
