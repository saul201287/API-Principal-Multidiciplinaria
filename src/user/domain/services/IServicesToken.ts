export interface IServicesToken {
    singToken(id:string,secret:string, expiresIn:number): Promise<string | null>;
}