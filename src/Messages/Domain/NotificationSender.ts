export interface NotificationSender {
    sendWelcomeMessage(phoneNumber:string,userName: string) :Promise<void>;
    sendAlert(phoneNumber:string,message:string): Promise<void>;
}