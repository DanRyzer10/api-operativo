import { Request,Response,NextFunction } from "express";
import { AuthService } from "../../Domain/AuthService";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email:string;
        role: string;
    }
}

export class AuthMiddleware {
    constructor(private readonly authService:AuthService){}

    authenticate = (req:AuthRequest, res:Response, next:NextFunction) => {
        const authHeader = req.headers?.authorization;

        if ( !authHeader || !authHeader?.startsWith("Bearer ")) {
            res.status(401).json({message:"No token provided"});
            return;
        }

        const token   = authHeader.split(" ")[1];
        const decoded = this.authService.verifyToken(token);

        if ( !decoded ) {
            res.status(401).json({message:"Invalid token"});
            return;
        }

        req.user = decoded;
        next();
    }

    authorize = (...allowedRole:string[]) => {
        return (req:AuthRequest,res:Response,next:NextFunction) => {
            if ( !req.user ) {
                res.status(401).json({error:"Unauthorized"});
                return;
            }
            if ( !allowedRole.includes(req.user.role ) ) {
                res.status(403).json({error:"Forbidden"});
                return;
            }
            next();
        }
    }
}