import { Request,Response } from "express";
import { RegisterUserService } from "../../Application/RegisterUserService";


export class UserController {
    constructor(private registeUserService:RegisterUserService){}


    async create(re:Request,res:Response) {
        const {id,email,name} = re.body;
        try {
            await this.registeUserService.execute(id,name,email);
            res.status(201).send({message: 'User created successfully'});
        }catch (error){
            res.status(400).send({error: (error as Error).message});
        };

    }
}