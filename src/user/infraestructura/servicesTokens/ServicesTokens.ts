import {sign} from "jsonwebtoken"
import { IServicesToken } from "../../domain/services/IServicesToken"

export class ServicesTokens implements IServicesToken{
    async  singToken(id: string, secret: string): Promise<string | null> {
        try {
            console.log(id,33);
            
            const token = sign(id, secret )    
            console.log(token);
            
           return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}