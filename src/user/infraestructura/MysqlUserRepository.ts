import { query } from "../../database/mysql";
import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM users ";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.nombre,
            user.apellidoP,
            user.apellidoM,
            user.email,
            user.username,
            user.password
          )
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createUser(
    id: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string,
    username: string,
    password: string
  ): Promise<{user:User, token:string} | null> {    
    const sql =
      "INSERT INTO users (id,nombre,apellidoP, apellidoM, email, username, password) VALUES (?, ?, ?, ?, ?, ?,?)";
    const params: any[] = [
      id,
      nombre,
      apellidoP,
      apellidoM,
      email,
      username,
      password,
    ];
    try {
      const [result]: any = await query(sql, params);
      const user: any = new User(
        id,
        nombre,
        apellidoP,
        apellidoM,
        email,
        username,
        password
      )
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getOne(username: string): Promise<User[] | null> {
    const sql = "SELECT * FROM users where username= ? ";
    let params: any[] = [username];
    try {
      const [data]: any = await query(sql, params);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.nombre,
            user.apellidoP,
            user.apellidoM,
            user.email,
            user.username,
            user.password
          )
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async putUser(
    username: string,
    newPassword: string
  ): Promise<null | User[]> {
    const sql = "UDATE users SET password where username= ? ";
    let params: any[] = [username, newPassword];
    try {
      const [data]: any = await query(sql, params);
      const dataUsersNew = Object.values(JSON.parse(JSON.stringify(data)));
      console.log(dataUsersNew);
      
      return dataUsersNew.map(
        (user: any) =>
          new User(
            user.id,
            user.nombre,
            user.apellidoP,
            user.apellidoM,
            user.email,
            user.username,
            user.password
          )
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
