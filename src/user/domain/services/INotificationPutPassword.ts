import { User } from "../entities/User";
export interface INotification {
  sendNotificationPutPassword(email: string): Promise<boolean>;
  sendNotificationPutUsername(email: string): Promise<boolean>;
}
