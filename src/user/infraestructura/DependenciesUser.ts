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
import { PutUserNameController } from "./controllers/PutUserUserNameController";
import { PutUserUserNameUseCase } from "../app/PutUserUsernameUseCase";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { EncryptServices } from "./helpers/EncryptServices";
import { ServicesEmail } from "./servicesEmail/ServicesEmail";
import { ServicesTokens } from "./servicesTokens/ServicesTokens";
import { IdServices } from "./helpers/IdServices";
import { NotificationUserUSeCase } from "../app/services/NotificationPutPasswordUseCase";
import { Notification } from "./servicesRabbitMQ/servicesRabbitMQ";

const mysqlUsertRepository = new MysqlUserRepository();
const servicesEncrypt = new EncryptServices();
const servicesEmail = new ServicesEmail();
const webTokens = new ServicesTokens();
const idUser = new IdServices();
const notificationPutPassword = new Notification();

const servicesTokensUser = new ServicesTokensUser(webTokens);
const servicesEmailUser = new ServicesEmailUser(servicesEmail);
const servicesNotification = new NotificationUserUSeCase(
  notificationPutPassword
);

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
const putUserPasswordUseCase = new PutUserPasswordUseCase(
  servicesEncrypt,
  mysqlUsertRepository,
  notificationPutPassword
);
const putUserNameUseCase = new PutUserUserNameUseCase(
  mysqlUsertRepository,
  notificationPutPassword
);

export const putUserPasswordController = new PutUserController(
  putUserPasswordUseCase
);
export const putUserUserNameController = new PutUserNameController(putUserNameUseCase)
export const getAllUserController = new GetAllUserController(getAllUserUseCase);
export const getOneUserController = new GetOneUserController(getOneUserUseCase);
export const createUserController = new CreateUserController(createUserUseCase);
