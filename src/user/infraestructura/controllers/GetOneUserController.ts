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
      if (typeof users !== "string") {
        res.status(200).header("token",users.token).send({
          status: "success",
          data: users,
        });
      } else
        res.status(404).send({
          status: "error",
          msn: users,
        });
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        msg: error,
      });
    }
  }
}
