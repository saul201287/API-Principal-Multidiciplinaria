import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { IEncryptServices } from "./services/IEncryptServices";
import { ServicesEmailUser } from "./services/ServicesEmailUser";
import { ServicesTokensUser} from "./services/ServicesTokensUser";
import { ICreateId } from "./services/ICreateId";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly options: IEncryptServices,
    readonly nodeMailer: ServicesEmailUser,
    readonly webToken: ServicesTokensUser,
    readonly createId: ICreateId,
  ) {}

  async run(
    id: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    username: string,
    email: string,
    password: string,
    plan: string
  ): Promise<{user:User, token: string} | null> {
    try {
      const newPassword = await this.options.encodePassword(password);
      id =  this.createId.asignarId()
      await this.nodeMailer.run(email, nombre);     
      let tokenNew = await this.webToken.run(
        username,
        String(process.env.SECRET_TOKEN),
        100 * 100
      );
      console.log(tokenNew);
      
      const user: any = await this.userRepository.createUser(
        id,
        nombre,
        apellidoP,
        apellidoM,
        email,
        username,
        newPassword,
        plan
      );
      const data: any = {
        user: user,
        token: tokenNew
      }
      if (user) return data;

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
