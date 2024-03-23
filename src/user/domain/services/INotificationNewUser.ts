import { User } from "../entities/User";
export interface INotificationNewUser{
    sendNotification(user: User): Promise<boolean> ;
}