export interface IEncryptServices {
  encodePassword(password: string): Promise<string>;
  compareTo(password: string, password2: string): Promise<boolean | null>;
}
