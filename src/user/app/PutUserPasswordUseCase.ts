import { UserRepository } from "../domain/repository/UserRepository";
import { IEncryptServices } from "./services/IEncryptServices";

export class PutUserPasswordUseCase {
  constructor(
    readonly options: IEncryptServices,
    readonly userRepository: UserRepository
  ) {}

  async run(
    username: string,
    password: string,
    newPassword: string
  ): Promise<string | number> {
    try {
      const data = await this.userRepository.getOne(username, newPassword);
      if (typeof data !== "string") {
        let password2 = data.user.password;
        const bandera = await this.options.compareTo(password, password2);
        if (bandera) {
          const newPassword2 = await this.options.encodePassword(newPassword);
          const result = await this.userRepository.putUserPassword(
            username,
            newPassword2
          );
          return result;
        } else {
          return "La contraseña no coincide";
        }
      } else {
        return data;
      }
    } catch (error) {
      return "ocurrio un error:" + error;
    }
  }
}
