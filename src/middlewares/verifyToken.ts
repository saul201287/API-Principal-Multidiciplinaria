import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { query } from "../database/mysql";
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
        "SELECT COUNT(*) AS count FROM users WHERE id = ?",
        [access]
      );
      let userFind2: any = Object.values(JSON.parse(JSON.stringify(userFind)));
      if (typeof userFind2 === "object") {
        if (userFind2[0][0].count > 0) {
          next();
        }else{
          res
          .status(401)
          .json({ message: "Acceso denegado, token invalido"});
        }
      }
    }else{
        res
        .status(401)
        .json({ message: "Acceso denegado, token no encontrado"});
    }
  } catch (error) {
    console.error(error);
    
     res
      .status(401)
      .json({ message: "Acceso denegado, token invalido", data: error });
  }
};
