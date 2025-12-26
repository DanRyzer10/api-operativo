import { NotificationSender } from "@/Messages/Domain/NotificationSender";
import { EventBus } from "@/Shared/Infrastructure/Bus/EventBus";
import { Logger } from "@/Shared/Infrastructure/Logger";
import { UserRegisteredEvent } from "@/User/Domain/UserRegisteredEvent";
import { EmailService } from "../EmailService";
import { APP_NAME, DIRECCION_EMPRESA,LINK_DASHBOARD } from "@/constants";



/**
 * Subscriber para enviar un email de bienvenida cuando un usuario se registra.
 * Escucha el evento UserRegisteredEvent y utiliza el servicio de email para enviar el mensaje.
 * @author Angel Zambrano
 */
export class WelcomeEmailSubscriber {
    constructor(private emailSender:EmailService,private logger:Logger){}

    setup(eventBus:EventBus): void {
        eventBus.subscribe('UserRegisteredEvent', async (event: UserRegisteredEvent) => {
            this.logger.info(`Enviando email de bienvenida a usuario ${event.name}`);
            const htmlContent = await this.emailSender.getWelcomeEmail({
                nombre: event.name,
                email: event.email,
                direccionEmpresa: DIRECCION_EMPRESA,
                nombrePlataforma: APP_NAME,
                linkConfiguracion: LINK_DASHBOARD
            })
            const response = await this.emailSender.sendEmail(event.email, "Bienvenido a la plataforma :)", htmlContent);
            this.logger.info(`Email de bienvenida enviado a ${event.email}. Respuesta: ${JSON.stringify(response)}`);
        })
    }
}