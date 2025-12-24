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
import { JwtAuthService } from "../../Auth/Infrastructure/JwtAuthService";
import { AuthMiddleware } from "../../Auth/Infrastructure/Middleware/AuthMiddleware";
import { LoginService } from "../../Auth/Application/LoginService";
import { AuthController } from "../../Auth/Infrastructure/Controllers/AuthController";
import { WelcomeEmailSubscriber } from "../../Messages/Infrastructure/Subscribers/WelcomeEmailSubscriber";
import { Logger } from "./Logger";
import { AppwriteAuthService } from "@/Auth/Application/AppwriteAuthService";

export class AppContext {

    /***MODULO USUARIO ******* */
    private static _userRepository      = new PrismaUserRepository();
    private static _nodeEventEmitterBus = new NodeEventEmitterBus();
    private static _whatsAppSender      = new WhatsAppBusinessService();
    private static _logger              = new Logger();
    private static authService : AppwriteAuthService;
    private static authMiddleware : AuthMiddleware;
    private static loginService : LoginService;
    private static authController : AuthController;

    private static _getRegisterUserService():RegisterUserService {
        return new RegisterUserService(this._userRepository,this._nodeEventEmitterBus);
    }
    public static getUserController():UserController {
        return new UserController(this._getRegisterUserService());
    }

    public static getAuthController() : AuthController {
        if(!this.authController) {
            this.loginService = new LoginService(this._userRepository,this.authService);
            this.authController = new AuthController(this.loginService);
        }

        return this.authController;
    }

    // public static getAuthMiddleware(): AuthMiddleware {
    //     if (!this.authMiddleware) {
    //         this.authMiddleware = new AuthMiddleware(this.authService);
    //     }
    //     return this.authMiddleware;
    // }

    public static getReportDispatcher() :ReportDispatcher {
        const cloud = CLOUD_PROVIDER;

        if ( cloud === 'aws' ) {
            return new AwsGlueDispatcher()

        }
        return new AwsGlueDispatcher()
    }

    public static getLogger(): Logger {
        return this._logger;
    }

    /**
     * Configuración de los suscriptores de eventos
     */
    public static eventSetup() : void {
        const welcomeSubscriber = new WelcomeWhatsAppSubscriber(this._whatsAppSender, this._logger);
        // this.authService = new JwtAuthService();
        welcomeSubscriber.setup(this._nodeEventEmitterBus);
        const welcomeEmailSubscriber = new WelcomeEmailSubscriber(this._whatsAppSender,this._logger);
        welcomeEmailSubscriber.setup(this._nodeEventEmitterBus);

    }
}