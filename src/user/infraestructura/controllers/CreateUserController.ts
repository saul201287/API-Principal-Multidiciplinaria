import { Request, Response } from "express";
import { CreateUserUseCase } from "../../app/CreateUserUseCase";
import { ValidatorValues } from "../validationes/Validationes";


export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const validationes = new ValidatorValues()
    try {
      if(await validationes.validationesUsername(data.username) > 0){
        res.status(409).send({
          status: "error",
          data: "El nombre de usuario ya se encuntra registrado",
        });
      }else if(await validationes.validationesEmail(data.email) > 0){
        res.status(409).send({
          status: "error",
          data: "El correo ingresado ya se encuntra registrado",
        });
      }else{
      const user : any = await this.createUserUseCase.run(
        data.id,
        data.nombre,
        data.apellidoP,
        data.apellidoM,
        data.username,
        data.email,
        data.password,
        data.plan,
        '00:00:00'
      );
      
      if (user)
        res.status(201).json({
          status: "success",
          data: {
            id: user?.user.id,
            nombre: user?.user.nombre,
            apellidoP: user?.user.apellidoP,
            apellidoM: user?.user.apellidoM,
            username: user?.user.username,
            email: user?.user.email,
            password: user?.user.password,
            plan: user?.plan
          },
          token: user.token
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        mesagges: error,
      });
    }
  }
}
