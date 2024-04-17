import { UserRepository } from "../domain/repository/UserRepository";
import { Notification } from "../infraestructura/servicesRabbitMQ/servicesRabbitMQ";

export class PutUserUserNameUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly notificationPutUserName: Notification
  ) {}

  async run(username: string, usernamenew: string): Promise<string | number> {
    try {
      const data = await this.userRepository.getOne(username, "");
      if (typeof data !== "string") {
        const result = await this.userRepository.putUserName(
          username,
          usernamenew
        );
        const send =
          await this.notificationPutUserName.sendNotificationPutUsername(data.user.email);

        return result;
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);

      return "ocurrio un error:" + error;
    }
  }
}
