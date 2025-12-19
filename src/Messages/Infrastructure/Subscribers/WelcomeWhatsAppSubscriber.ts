import { EventBus } from "../../../Shared/Infrastructure/Bus/EventBus";
import { UserRegisteredEvent } from "../../../User/Domain/UserRegisteredEvent";
import { NotificationSender } from "../../Domain/NotificationSender";
import { Logger } from "../../../Shared/Infrastructure/Logger";

export class WelcomeWhatsAppSubscriber {
    constructor(private whatsappSender: NotificationSender, private logger:Logger){}
    setup(eventBus: EventBus): void {
        eventBus.subscribe('UserRegisteredEvent',async (event: UserRegisteredEvent) => {
            this.logger.info("Reaccionando al evento desde whatssapp Subscriber");
            await this.whatsappSender.sendWelcomeMessage(event.email, event.name);
        })
    }
}