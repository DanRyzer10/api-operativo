import { IdGenerator } from "@/Shared/Infrastructure/IdGenerator";
import { Client } from "../Domain/Client";
import { ClientRepository } from "../Domain/ClientRepository";

export class ClientService {
    constructor(private clientRepository:ClientRepository){}
   async createClient(
    phoneNumber:string,
    fullName?:string,
    email?:string,
    address?:string,
    city?:string,
    state?:string,
    country?:string,
    postalCode?:string,
    tags?:string,
    notes?:string,
    sourceId?:string,
    statusId?:string,
    lastContactDate?:Date
    ) :Promise<void> {
        const existingClient = await this.clientRepository.findByPhoneNumber(phoneNumber);
        if ( existingClient ) {
            throw new Error(`El cliente con el número de teléfono ${phoneNumber} ya existe.`);
        }
        const client = Client.create({
            id: IdGenerator.generate(),
            phoneNumber: phoneNumber,
            fullName: fullName || null,
            email: email || null,
            address: address || null,
            city: city || null,
            state: state || null,
            country: country || null,
            postalCode: postalCode || null,
            tags: tags || "{}",
            notes: notes || null,
            sourceId: sourceId || null,
            statusId: statusId || null,
            lastContactDate: lastContactDate || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.clientRepository.save(client);
    }


    async updateClient(
        id:string,
        phoneNumber:string,
        fullName?:string,
        email?:string,
        address?:string,
        city?:string,
        state?:string,
        country?:string,
        postalCode?:string,
        tags?:string,
        notes?:string,
        sourceId?:string,
        statusId?:string,
        lastContactDate?:Date
    ) {
        const existingClient = await this.clientRepository.findById(id);
        if ( !existingClient ) {
            throw new Error(`El cliente con el ID ${id} no existe.`);
        }
        const updatedClient = Client.create({
            id: IdGenerator.generate(),
            phoneNumber: phoneNumber,
            fullName: fullName || null,
            email: email || null,
            address: address || null,
            city: city || null,
            state: state || null,
            country: country || null,
            postalCode: postalCode || null,
            tags: tags || "{}",
            notes: notes || null,
            sourceId: sourceId || null,
            statusId: statusId || null,
            lastContactDate: lastContactDate || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.clientRepository.update(updatedClient);
    }

    async listAllClients() : Promise<Client[]> {
        return this.clientRepository.listAll();
    }
    async deleteClient(clientId: string) : Promise<void> {
        await this.clientRepository.delete(clientId);
    }
}