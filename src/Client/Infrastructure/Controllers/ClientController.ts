import { ClientService } from "@/Client/Application/ClientService";
import { Request, Response } from "express";
import { createClientSchema } from "../Dtos/ClientSchema";

export class ClientController {
    constructor(private clientService:ClientService) {}


    async create( req:Request, res:Response ) {
        const validation = createClientSchema.safeParse(req.body);
        if( !validation.success ) {
            return res.status(400).json({
                message: "Datos de entrada inválidos"
            })

            
        }
        const data = validation.data;
        try {
            await this.clientService.createClient(
                data?.phoneNumber,
                data?.fullName,
                data?.email,
                data?.address,
                data?.city,
                data?.state,
                data?.country,
                data?.postalCode,
                data?.tags,
                data?.notes,
                data?.sourceId,
                data?.statusId,
                data?.lastContactDate
            )
            return res.status(201).json({
                message: "Cliente creado exitosamente"
            }
            )
        } catch ( error ) {
            return res.status(500).json({
                message: (error as Error).message
            })
        }
    }
}