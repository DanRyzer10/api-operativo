import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class RegisterUserService {
    constructor(private userRepository: UserRepository) {

    }

    async execute(id:string, name:string,email:string):Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email);
        if ( existingUser ) {
            throw new Error('User with this email already exists');
        }

        const user = new User(id,name,email);
        await this.userRepository.save(user);
    }
}