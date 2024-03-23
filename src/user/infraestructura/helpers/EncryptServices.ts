import { compare, hash } from "bcryptjs";
import { IEncryptServices } from "../../app/services/IEncryptServices";

export class EncryptServices implements IEncryptServices {
  async encodePassword(password: string): Promise<string> {
    const newPassword = await hash(password,Number(process.env.SECRET_JUMP));
    return newPassword;
  }

  async compareTo(
    password: string,
    hashedPassword: string
  ): Promise<boolean | null> {
    const result = await compare(password, hashedPassword);

    return result;
  }
}
