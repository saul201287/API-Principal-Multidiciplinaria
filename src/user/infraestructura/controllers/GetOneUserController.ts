import { Request, Response } from "express";
import { GetOneUserUseCase } from "../../app/GetOneUserUseCase";

export class GetOneUserController {
  constructor(readonly getOneUserUseCase: GetOneUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const users = await this.getOneUserUseCase.run(
        data.username,
        data.password
      );

      console.log(users);

      if (users) {
        res.status(200).send({
          status: "success",
          data: users.map((user: any) => {
            return {
              id: user.id,
              nombre: user.nombre,
              apellidoP: user.apellidoP,
              apellidoM: user.apellidoM,
              username: user.username,
              email: user.email,
              password: user.password,
            };
          }),
        });
      } else
        res.status(404).send({
          status: "error",
          msn: "No se encontro el recurso",
        });
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
