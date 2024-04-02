import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { query } from "../src/database/mysql";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers["x-token-access"];
    if (typeof token === "string") {
      let access = verify(token, process.env.SECRET_TOKEN || " ");
      let userFind = await query(
        "SELECT COUNT(*) AS count FROM users WHERE username = ?",
        [access]
      );
      let userFind2: any = Object.values(JSON.parse(JSON.stringify(userFind)));
      if (typeof userFind2 === "object") {
        console.log(userFind2[0][0].count);
        if (userFind2[0][0].count > 0) {
          next();
        }
      }
    }else{
        res
        .status(500)
        .json({ message: "Acceso denegado, token invalido"});
    }
  } catch (error) {
     res
      .status(500)
      .json({ message: "Acceso denegado, token invalido", data: error });
  }
};
