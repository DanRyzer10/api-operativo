import { InMemoryUserRepository } from "../../User/Infrastructure/Persistence/InMemoryUserRepository";
import { RegisterUserService } from "../../User/Application/RegisterUserService";

import { UserController } from "../../User/Infrastructure/Controllers/UserController";
import { PrismaUserRepository } from "../../User/Infrastructure/Persistence/PrismaUserRepository";
import { ReportDispatcher } from "../../Reporting/Domain/ReportDispatcher";
import { CLOUD_PROVIDER } from "../../constants";
import { AwsGlueDispatcher } from "../../Reporting/Infrastructure/AwsGlueDispatcher";

export class AppContext {

    /***MODULO USUARIO ******* */
    private static _userRepository: PrismaUserRepository= new PrismaUserRepository();
    private static _getRegisterUserService():RegisterUserService {
        return new RegisterUserService(this._userRepository);
    }
    public static getUserController():UserController {
        return new UserController(this._getRegisterUserService());
    }

    public static getReportDispatcher() :ReportDispatcher {
        const cloud = CLOUD_PROVIDER;

        if ( cloud === 'aws' ) {
            return new AwsGlueDispatcher()

        }
        return new AwsGlueDispatcher()
    }
}