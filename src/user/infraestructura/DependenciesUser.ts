import { PutUserPasswordUseCase } from "../app/PutUserPasswordUseCase";
import { GetAllUserUseCase } from "../app/GetAllUserUserCase";
import { GetOneUserUseCase } from "../app/GetOneUserUseCase";
import { CreateUserUseCase } from "../app/CreateUserUseCase";
import { ServicesTokensUser } from "../app/services/ServicesTokensUser";
import { ServicesEmailUser } from "../app/services/ServicesEmailUser";
import { PutUserController } from "./controllers/PutUserPasswordController";
import { GetAllUserController } from "./controllers/GetAllUserController";
import { GetOneUserController } from "./controllers/GetOneUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { EncryptServices } from "./helpers/EncryptServices";
import { ServicesEmail } from "./servicesEmail/ServicesEmail";
import { ServicesTokens } from "./servicesTokens/ServicesTokens";
import { IdServices } from "./helpers/IdServices";

const mysqlUsertRepository = new MysqlUserRepository();
const servicesEncrypt = new EncryptServices();
const servicesEmail = new ServicesEmail();
const webTokens = new ServicesTokens();
const idUser = new IdServices();

const servicesTokensUser = new ServicesTokensUser(webTokens);
const servicesEmailUser = new ServicesEmailUser(servicesEmail);

const putUserPasswordUseCase = new PutUserPasswordUseCase(servicesEncrypt,mysqlUsertRepository);
const getAllUserUseCase = new GetAllUserUseCase(mysqlUsertRepository);
const getOneUserUseCase = new GetOneUserUseCase(
  mysqlUsertRepository,
  servicesEncrypt,
  servicesTokensUser
);
const createUserUseCase = new CreateUserUseCase(
  mysqlUsertRepository,
  servicesEncrypt,
  servicesEmailUser,
  servicesTokensUser,
  idUser
);

export const putUserPasswordController = new PutUserController(putUserPasswordUseCase);
export const getAllUserController = new GetAllUserController(getAllUserUseCase);
export const getOneUserController = new GetOneUserController(getOneUserUseCase);
export const createUserController = new CreateUserController(createUserUseCase);
