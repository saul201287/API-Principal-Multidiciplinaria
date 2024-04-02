import { User } from "../entities/User";

export interface UserRepository {
  getAll(): Promise<User[] | null>;
  createUser(
    id: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string,
    username: string,
    newPassword: string,
    plan: string
  ): Promise<{user:User, token:string} | null>;
  getOne(username: string, password: string): Promise<{user:User,token:string } | string>;
  putUser(username: string, newPassword: string): Promise<User[] | null>;
}