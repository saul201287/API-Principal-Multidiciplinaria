import { compare } from "bcryptjs";
import { User } from "../../domain/entities/User";
import { query } from "../../../database/mysql";

export class ValidatorValues {
  async validationesUsername(username: string): Promise<number> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
    try {
      let res = await query(sql, [username]);
      let object: any = Object.values(JSON.parse(JSON.stringify(res)));
      if (object.length > 0) {
        return object[0][0].count;
      } else {
        return -1;
      }
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async validationesEmail(email: string): Promise<number> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ? ";
    try {
      let res = await query(sql, [email]);
      let object: any = Object.values(JSON.parse(JSON.stringify(res)));
      if (typeof object === "object") {
        return object[0][0].count;
      } else {
        return -1;
      }
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async validatePassword(username: string, password: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM users where username= ? ";
      const [data]: any = await query(sql, [username]);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
      if (dataUsers.length > 0) {
        let data: User[] = dataUsers.map(
          (user: any) =>
            new User(
              user.id,
              user.nombre,
              user.apellidoP,
              user.apellidoM,
              user.email,
              user.username,
              user.password,
              user.plan
            )
        );
        if (data[0].password != undefined) {
          const result = await compare(password, data[0].password);
          return result;
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
