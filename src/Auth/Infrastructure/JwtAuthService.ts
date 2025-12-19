import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { User } from "../../User/Domain/User";

import { AuthService } from "../Domain/AuthService";
import { BusinessScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace";
import { Role } from "../Domain/PermissionService";

export class JwtAuthService implements AuthService {
    private readonly secret: string;
    private readonly expiresIn:string;

    constructor(secret:string,expiresIn:string) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    generateToken(user: User):string {
        return jwt.sign(
            {id:user.id,email:user.email,role:user.role as Role}
            ,this.secret,
            {expiresIn: this.expiresIn}
        );
    }

    verifyToken(token: string): { id: string; email: string; role: string } | null {
        try {
            const decoded = jwt.verify(token,this.secret) as {
                id: string;
                email: string;
                role: string;
            }
            return decoded;

        }catch ( error ) {
            return null;
        }
    }
}