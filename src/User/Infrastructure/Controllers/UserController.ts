import { Request,Response } from "express";
import { RegisterUserService } from "../../Application/RegisterUserService";
import { CreateUserSchema } from "../Dtos/CreateUserRequest";
import { randomUUID } from "node:crypto";
import { IdGenerator } from "../../../Shared/Infrastructure/IdGenerator";


export class UserController {
    constructor(private registeUserService:RegisterUserService){}


    async create(re:Request,res:Response) {
        const validation = CreateUserSchema.safeParse(re.body);
        if(!validation.success) {
            return res.status(400).json({
                message: "Datos de entrada inválidos"
            })
        }
        const {name,email,phone,role,password} = validation.data;
        const randomUID = IdGenerator.generate();
        try {
            await this.registeUserService.execute(randomUID,name,email,phone,role!,password!);
            res.status(201).send({message: 'User created successfully'});
        }catch (error){
            res.status(400).send({error: (error as Error).message});
        };

    }
}