export interface IServicesEmail {
    sendMail(email: string, name: string): Promise<boolean>;
}