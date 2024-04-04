import { ServicesTokens } from "../../infraestructura/servicesTokens/ServicesTokens";

export class ServicesTokensUser {
  constructor(readonly webToken: ServicesTokens) {}
  async run(id: string, secret: string, expiresIn: number): Promise<string | null>{
    try {
      const token = await this.webToken.singToken(id, secret);
      return token;
    } catch (error) {
        console.log(error);
      return null;
    }
  }
}
