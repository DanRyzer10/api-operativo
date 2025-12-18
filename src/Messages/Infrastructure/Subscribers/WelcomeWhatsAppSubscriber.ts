import { EventBus } from "../../../Shared/Infrastructure/Bus/EventBus";
import { UserRegisteredEvent } from "../../../User/Domain/UserRegisteredEvent";
import { NotificationSender } from "../../Domain/NotificationSender";

export class WelcomeWhatsAppSubscriber {
    constructor(private whatsappSender: NotificationSender){}
    setup(eventBus: EventBus): void {
        eventBus.subscribe('UserRegisteredEvent',async (event: UserRegisteredEvent) => {
            console.log("Reaccionando al evento")
            await this.whatsappSender.sendWelcomeMessage(event.email, event.name);
        })
    }
}