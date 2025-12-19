import { Request, Response } from "express";
import { LoginService } from "../../Application/LoginService";

export class AuthController {
    constructor(
        private readonly loginService:LoginService
    ){}

    async login(req:Request,res:Response): Promise<void> {
        try {
            const {email,password} = req.body;
            if ( !email || !password ) {
                res.status(400).json({message:"Email and password are required"});
                return;
            }

            const result = await this.loginService.execute(email,password);
            if ( !result ) {
                res.status(401).json({message:"Invalid credentials"});
                return;
            }
            res.status(200).json(result);
        }catch ( error ) {
            res.status(500).json({message:"Internal server error"});
        }
    }
}