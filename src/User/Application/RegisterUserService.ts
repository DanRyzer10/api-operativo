import { EncriptoUtil } from "@/Shared/Utils/EncriptorUtil";
import { EventBus } from "../../Shared/Infrastructure/Bus/EventBus";
import { User } from "../Domain/User";
import { UserRegisteredEvent } from "../Domain/UserRegisteredEvent";
import { UserRepository } from "../Domain/UserRepository";

export class RegisterUserService {
    constructor(private userRepository: UserRepository,private eventBus: EventBus) {

    }
    async execute(id:string,name:string,email:string,phone:string,role:string,password: string):Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email);
        if ( existingUser ) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await EncriptoUtil.encryptPassword(password);
        const user  = User.create(id,name,email,phone,role,hashedPassword);
        await this.userRepository.save(user);
        const event = new UserRegisteredEvent(user.id!,user.email,user.name);
        this.eventBus.publish(event);
    }
}