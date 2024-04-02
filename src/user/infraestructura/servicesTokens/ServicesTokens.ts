import {sign} from "jsonwebtoken"
import { IServicesToken } from "../../domain/services/IServicesToken"

export class ServicesTokens implements IServicesToken{
    async  singToken(username: string, secret: string): Promise<string | null> {
        try {
            const token = sign(username, secret )    
           return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}