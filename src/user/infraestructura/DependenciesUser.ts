import { PutUserPasswordUseCase } from "../app/PutUserPasswordUseCase";
import { GetAllUserUseCase } from "../app/GetAllUserUserCase";
import { GetOneUserUseCase } from "../app/GetOneUserUseCase";
import { CreateUserUseCase } from "../app/CreateUserUseCase";
import { ServicesPaymentsUseCase } from "../app/services/ServicesPaymentsUseCase";
import { ServicesTokensUser } from "../app/services/ServicesTokensUser";
import { ServicesEmailUser } from "../app/services/ServicesEmailUser";
import { PutUserController } from "./controllers/PutUserPasswordController";
import { GetAllUserController } from "./controllers/GetAllUserController";
import { GetOneUserController } from "./controllers/GetOneUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { PutUserNameController } from "./controllers/PutUserUserNameController";
import { PutUserUserNameUseCase } from "../app/PutUserUsernameUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { EncryptServices } from "./helpers/EncryptServices";
import { ServicesEmail } from "./servicesEmail/ServicesEmail";
import { ServicesTokens } from "./servicesTokens/ServicesTokens";
import { IdServices } from "./helpers/IdServices";
import { NotificationUserUSeCase } from "../app/services/NotificationPutPasswordUseCase";
import { Notification } from "./servicesRabbitMQ/servicesRabbitMQ";
import { PaymentServices } from "./servicesPayments/PaymentsServices";

const mysqlUsertRepository = new MysqlUserRepository();
const servicesEncrypt = new EncryptServices();
const servicesEmail = new ServicesEmail();
const webTokens = new ServicesTokens();
const idServices = new IdServices();
const notificationPutPassword = new Notification();
const paymentServices = new PaymentServices();
const servicesTokensUser = new ServicesTokensUser(webTokens);
const servicesEmailUser = new ServicesEmailUser(servicesEmail);
const servicesNotification = new NotificationUserUSeCase(
  notificationPutPassword
);

const servicesPaymentsUseCase = new ServicesPaymentsUseCase(
  paymentServices,
  idServices
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
  idServices
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
export const putUserUserNameController = new PutUserNameController(
  putUserNameUseCase
);
export const createPaymentController = new CreatePaymentController(
  servicesPaymentsUseCase
);
export const getAllUserController = new GetAllUserController(getAllUserUseCase);
export const getOneUserController = new GetOneUserController(getOneUserUseCase);
export const createUserController = new CreateUserController(createUserUseCase);
