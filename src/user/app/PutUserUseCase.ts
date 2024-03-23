import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class PutUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(username: string, newPassword: string): Promise<User[] | null> {
    try {
      const result = await this.userRepository.putUser(username, newPassword);
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
