import {sign} from "jsonwebtoken"
import { IServicesToken } from "../../domain/services/IServicesToken"

export class ServicesTokens implements IServicesToken{
    async  singToken(id: string, secret: string): Promise<string | null> {
        try {
            const token = sign(id, secret )    
           return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}