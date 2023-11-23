import "reflect-metadata";
import { Container } from "inversify";
import { HttpService } from "@/services/httpService";
import { MailService } from "@/services/mailService";
import { StorageService } from "@/services/storageService";
import { ValidationService } from "@/services/validationService";
import { DbConnService } from "@/services/dbConnService";
import { DevLoggerService } from "@/services/devLoggerService";
import { JWTService } from "@/services/jwtService";

const FrontendServices = new Container();
FrontendServices.bind<DevLoggerService>('DevLoggerService').to(DevLoggerService).inSingletonScope();
FrontendServices.bind<HttpService>('HttpService').to(HttpService).inSingletonScope();
FrontendServices.bind<StorageService>('StorageService').to(StorageService).inSingletonScope();
FrontendServices.bind<ValidationService>('ValidationService').to(ValidationService).inSingletonScope();

export {FrontendServices};
