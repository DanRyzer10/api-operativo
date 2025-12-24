import { UserRepository } from "../../User/Domain/UserRepository";
import { AuthService } from "../Domain/AuthService";
import { Role } from "../Domain/PermissionService";
import { AppwriteAuthService } from "./AppwriteAuthService";

export class LoginService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService:AppwriteAuthService
    ){}


    async execute(email:string, password: string): Promise<{token:string,user:any} |null> {
        try {
            const sessionToken = await this.authService.authenticateUser(email, password);
            const appwriteUser = await this.authService.getCurrentUser(sessionToken);
            const localUser    = await this.userRepository.findByEmail(email);

            if ( !localUser ) {
                return null;
            }

            return {
                token: sessionToken,
                user : {
                    id: localUser.id,
                    name: localUser.name,
                    email: localUser.email,
                    role: localUser.role as Role
                }
            }

        }catch(error:any) {
            throw new Error(`Error during login: ${error.message}`);
        }
        // const user = await this.userRepository.findByEmail(email);
        // if ( !user ) {
        //     return null;
        // }

        // const userWithPassword = await this.userRepository.findByEmail(email);
        // if ( !userWithPassword || !userWithPassword.password ) {
        //     return null;
        // }

        // const token = this.authService.generateToken(user);

        // return {
        //     token,
        //     user: {
        //         id:user.id,
        //         name:user.name,
        //         email:user.email,
        //         role: user.role as Role
        //     }
        // };
    }
}