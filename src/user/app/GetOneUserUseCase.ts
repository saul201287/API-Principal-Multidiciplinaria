import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";
import { IEncryptServices } from "./services/IEncryptServices";

export class GetOneUserUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly options: IEncryptServices
  ) {}

  async run(username: string, password: string): Promise<User[] | null> {
    try {
      const result = await this.userRepository.getOne(username, password);
      if (result) {
        let password2 = result[0].password
        const pass = await this.options.compareTo(password, password2);
        console.log(result);
        if (pass) return result;
        else return null;

      } else return null;
    } catch (error) {
      return null;
    }
  }
}
