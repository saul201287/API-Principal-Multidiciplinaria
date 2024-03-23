import express from "express";
import {
  getAllUserController,
  getOneUserController,
  createUserController,
  putUserController,
} from "./DependenciesUser";
export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
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

userRouter.put("/newUser", (req, res) => {
  putUserController
    .run(req, res)
    .then(() => {
      return null;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
