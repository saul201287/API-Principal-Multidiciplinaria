import express from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { ApagaraMQTT } from "./helpers/ApagarMQTT";
import {
  getAllUserController,
  getOneUserController,
  createUserController,
  putUserPasswordController,
  putUserUserNameController,
  createPaymentController,
} from "./DependenciesUser";
export const userRouter = express.Router();

userRouter.get("/:username", verifyToken, (req, res) => {
  getAllUserController
    .run(req, res)
    .then(() => {
      return null;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        error: error,
        msg: "Error en el servidor",
      });
    });
});

userRouter.post("/login", (req, res) => {
  getOneUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
        msg: "Error en el servidor",
      });
    });
});

userRouter.post("/", (req, res) => {
  createUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.put("/newPass", verifyToken, (req, res) => {
  putUserPasswordController
    .run(req, res)
    .then(() => {
      return null;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.put("/newUser", verifyToken, (req, res) => {
  putUserUserNameController
    .run(req, res)
    .then(() => {
      return null;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/pay", verifyToken, (req, res) => {
  createPaymentController
    .run(req, res)
    .then(() => {
      return null;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/off", async (req, res) => {
  const apagaraMQTT = new ApagaraMQTT()
   await apagaraMQTT.run()
    .then((resp) => {
      return res.status(201).send("Apagado")
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});