import amqplib from "amqplib"
import { User } from "../../domain/entities/User"
import { INotificationNewUser } from "../../domain/services/INotificationNewUser"

export class NotificationNewUser implements INotificationNewUser{
    private options: any;
    private url: any;
    private exch: any;

    constructor(){
        this.options ={
            vhost: process.env.AMQP_VHOST,
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      port: process.env.AMQP_PORT,
        }
        this.url = process.env.URL_RABBIT;
        this.exch = process.env.AMQP_EXCH;
    }
    async sendNotification(user: User): Promise<boolean> {
        //Opción de conexión para instancia EC2
        const conn = await amqplib.connect(this.url, this.options);
        //Opción de conexión para cloudamqp
        //const conn  = await amqplib.connect(this.server);
        const ch = await conn.createChannel();
        const status = await ch.publish(this.exch, "", Buffer.from("Prueba"));
        return status;
      }
}