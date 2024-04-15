import { User } from "../entities/User";

export interface UserRepository {
  getAll(username: string): Promise<User[] | null>;
  createUser(
    id: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string,
    username: string,
    newPassword: string,
    plan: number,
    duracion: string
  ): Promise<{ user: User; token: string } | null>;
  getOne(
    username: string,
    password: string
  ): Promise<{ user: User; token: string } | string>;
  putUserPassword(
    username: string,
    newPassword: string
  ): Promise<string | number>;
  putUserName(username: string, usernamenew: string): Promise<string | number>;
}
