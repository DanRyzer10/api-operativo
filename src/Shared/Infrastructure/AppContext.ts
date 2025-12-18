import { InMemoryUserRepository } from "../../User/Infrastructure/Persistence/InMemoryUserRepository";
import { RegisterUserService } from "../../User/Application/RegisterUserService";

import { UserController } from "../../User/Infrastructure/Controllers/UserController";
import { PrismaUserRepository } from "../../User/Infrastructure/Persistence/PrismaUserRepository";
import { ReportDispatcher } from "../../Reporting/Domain/ReportDispatcher";
import { CLOUD_PROVIDER } from "../../constants";
import { AwsGlueDispatcher } from "../../Reporting/Infrastructure/AwsGlueDispatcher";
import { NodeEventEmitterBus } from "./Bus/NodeEventEmitterBus";
import { WelcomeWhatsAppSubscriber } from "../../Messages/Infrastructure/Subscribers/WelcomeWhatsAppSubscriber";
import { WhatsAppBusinessService } from "../../Messages/Infrastructure/External/WhatsAppBusinessService";

export class AppContext {

    /***MODULO USUARIO ******* */
    private static _userRepository      = new PrismaUserRepository();
    private static _nodeEventEmitterBus = new NodeEventEmitterBus();
    private static _whatsAppSender      = new WhatsAppBusinessService();

    private static _getRegisterUserService():RegisterUserService {
        return new RegisterUserService(this._userRepository,this._nodeEventEmitterBus);
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

    /**
     * Configuración de los suscriptores de eventos
     */
    public static eventSetup() : void {
        const welcomeSubscriber = new WelcomeWhatsAppSubscriber(this._whatsAppSender);
        welcomeSubscriber.setup(this._nodeEventEmitterBus);

    }
}