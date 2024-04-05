import amqplib from "amqplib";
import { INotification } from "../../domain/services/INotificationPutPassword";

export class Notification implements INotification {
  private options: any;
  private url: any;
  private exch: any;
  private queue: any;
  private queue2: any;
  private routingkey: any;
  private routingkey2: any;

  constructor() {
    this.options = {
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
    };
    this.url = process.env.AMQP_URL;
    this.exch = process.env.AMQP_EXCH;
    this.queue = process.env.AMQP_QUEUE_PASSWORD;
    this.routingkey = process.env.AMQP_ROUTINGKEY;
    this.routingkey2 = process.env.AMQP_ROUTINGKEY2;
    this.queue2 = process.env.AMQP_QUEUE_USERNAME;
  }
  async sendNotificationPutPassword(email: string): Promise<boolean> {
    try {
      const conn = await amqplib.connect(this.url, this.options);
      const ch = await conn.createChannel();
      const union = await ch.bindQueue(this.queue, this.exch, this.routingkey);
      const status = await ch.publish(
        this.exch,
        this.routingkey,
        Buffer.from(email)
      );
      if (status)
        setTimeout(() => {
          conn.close();
        }, 8000);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async sendNotificationPutUsername(email: string): Promise<boolean> {
    try {
      const conn = await amqplib.connect(this.url, this.options);
      const ch = await conn.createChannel();
      const union = await ch.bindQueue(
        this.queue2,
        this.exch,
        this.routingkey2
      );
      const status = await ch.publish(
        this.exch,
        this.routingkey2,
        Buffer.from(email)
      );
      if (status)
        setTimeout(() => {
          conn.close();
        }, 6000);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
