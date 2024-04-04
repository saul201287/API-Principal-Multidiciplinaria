import { Notification } from "../../infraestructura/servicesRabbitMQ/servicesRabbitMQ";
export class NotificationUserUSeCase {
  constructor(readonly serviceNotifiacion: Notification) {}

  async run(email: string) {
    await this.serviceNotifiacion.sendNotificationPutPassword(email);
    await this.serviceNotifiacion.sendNotificationPutUsername(email);
  }
}
