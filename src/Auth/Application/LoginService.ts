import { UserRepository } from "../../User/Domain/UserRepository";
import { AuthService } from "../Domain/AuthService";
import { Role } from "../Domain/PermissionService";

export class LoginService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService:AuthService
    ){}


    async execute(email:string, password: string): Promise<{token:string,user:any} |null> {
        const user = await this.userRepository.findByEmail(email);
        if ( !user ) {
            return null;
        }

        const userWithPassword = await this.userRepository.findByEmail(email);
        if ( !userWithPassword || !userWithPassword.password ) {
            return null;
        }

        const token = this.authService.generateToken(user);

        return {
            token,
            user: {
                id:user.id,
                name:user.name,
                email:user.email,
                role: user.role as Role
            }
        };
    }
}