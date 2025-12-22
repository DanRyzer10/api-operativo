import { NotificationSender } from "../../Messages/Domain/NotificationSender";
import { User } from "../../User/Domain/User";
import { UserRepository } from "../../User/Domain/UserRepository";
import { ChatToolProvide } from "../Domain/ChatToolProvider";

export class AppWriteToolAdapter implements ChatToolProvide {
    constructor(
        private userRepository:  UserRepository,
        private whatsapp: NotificationSender
    ){}

    async getUserInfo(email: string) {
        return this.userRepository.findByEmail(email);
    }
    async sendeMessageAlert(phone: string, message: string): Promise<void> {
        return this.whatsapp.sendAlert(phone,message)
    }
}