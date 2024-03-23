import { User } from "../../domain/entities/User";
import { NotificationNewUser } from "../../infraestructura/servicesRabbitMQ/servicesRabbitMQ";

export class NotificationUserUSeCase {
    constructor(readonly serviceNotifiacion: NotificationNewUser) {}
  
    async run(user: User) {
      await this.serviceNotifiacion.sendNotification(user);
    }
  }
