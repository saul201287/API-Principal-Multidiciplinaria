import { ServicesTokens } from "../../infraestructura/servicesTokens/ServicesTokens";

export class ServicesTokensUser {
  constructor(readonly webToken: ServicesTokens) {}
  async run(username: string, secret: string, expiresIn: number): Promise<string | null>{
    try {
      const token = await this.webToken.singToken(username, secret);
      return token;
    } catch (error) {
        console.log(error);
      return null;
    }
  }
}
