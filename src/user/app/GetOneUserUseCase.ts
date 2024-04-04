import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { IEncryptServices } from "./services/IEncryptServices";
import { ServicesTokensUser } from "./services/ServicesTokensUser";

export class GetOneUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly options: IEncryptServices,
    readonly webToken: ServicesTokensUser
  ) {}

  async run(
    username: string,
    password: string
  ): Promise<{ user: User; token: string } | string> {
    try {
      const result = await this.userRepository.getOne(username, password);
      if (typeof result !== 'string') {
        let password2 = result.user.password;
        const pass = await this.options.compareTo(password, password2);
        if (pass) {
          let token = await this.webToken.run(
            result.user.id,
            String(process.env.SECRET_TOKEN),
            100 * 100
          );
          if (token) return { user: result?.user, token: token };
          else return "El token no fue asignado";
        } else return "La contraseña es incorrecta";
      } else {
        return result;
      }
    } catch (error) {
      return "Ocurrio un error: " + error;
    }
  }
}
