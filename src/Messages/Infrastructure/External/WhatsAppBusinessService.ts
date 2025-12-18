import { NotificationSender } from "../../Domain/NotificationSender";

export class WhatsAppBusinessService implements NotificationSender {
    async sendWelcomeMessage(phoneNumber: string, userName: string): Promise<void> {
        console.log(`Sending welcome message to ${userName} at ${phoneNumber} via WhatsApp Business API`);
    }
    async sendAlert(phoneNumber: string, message: string): Promise<void> {
        console.log(`Sending alert to ${phoneNumber} via WhatsApp Business API: ${message}`);
    }
}