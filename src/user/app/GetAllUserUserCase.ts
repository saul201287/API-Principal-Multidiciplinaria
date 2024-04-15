import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class GetAllUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(username:string): Promise<User[] | null> {
    try {
      const result = await this.userRepository.getAll(username);
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
