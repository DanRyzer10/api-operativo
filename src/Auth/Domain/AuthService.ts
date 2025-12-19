import { User } from "../../User/Domain/User";




export interface AuthService {
    hashPassword(password:string):Promise<string>;
    comparePassword(password:string, hashedPassword: string):Promise<boolean>;
    generateToken(user:User):string;
    verifyToken(token:string): { id: string; email: string; role: string } | null;
}