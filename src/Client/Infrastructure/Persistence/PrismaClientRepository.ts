import { Client } from "@/Client/Domain/Client";
import { ClientRepository } from "@/Client/Domain/ClientRepository";
import { CLIENT_STATUS } from "@/Shared/Infrastructure/CatalogService";
import { prisma } from "@/Shared/Infrastructure/PrismaClient";

export class PrismaClientRepsitory implements ClientRepository {
    async save(client: Client): Promise<void> {
        await prisma.client.create({
            data: {
                id:client.id!,
                fullName:client.fullName,
                email:client.email,
                address: client.address,
                state: CLIENT_STATUS.ACTIVE,
                phoneNumber: client.phoneNumber,
                country: client.country,
                postalCode: client.postalCode,
                tags: client.tags,
                notes: client.notes,
                sourceId: client.sourceId,
                statusId: client.statusId,
                lastContactDate: client.lastContactDate,
            }
        })
        
    }
    async findByPhoneNumber(phoneNumber: string): Promise<Client | null> {
        const clientData = await  prisma.client.findUnique({where: {phoneNumber}});
        if(!clientData) return null;
        return Client.create({
            id: clientData.id,
            phoneNumber: clientData.phoneNumber,
            fullName: clientData.fullName,
            email: clientData.email,
            address: clientData.address,
            city: clientData.city,
            state: clientData.state,
            country: clientData.country,
            postalCode: clientData.postalCode,
            tags: clientData.tags!,
            notes: clientData.notes,
            sourceId: clientData.sourceId,
            statusId: clientData.statusId,
            lastContactDate: clientData.lastContactDate,
            createdAt: clientData.createdAt,
            updatedAt: clientData.updatedAt,
            deletedAt: clientData.deletedAt
        });
    }
    async update(client: Client): Promise<void> {
        await prisma.client.update({
            where: {id: client.id!},
            data: {
                fullName:client.fullName,
                email:client.email,
                address: client.address,
                state: client.state,
                phoneNumber: client.phoneNumber,
                country: client.country,
                postalCode: client.postalCode,
                tags: client.tags,
                notes: client.notes,
                sourceId: client.sourceId,
                statusId: client.statusId,
                lastContactDate: client.lastContactDate,
                updatedAt: new Date()
            }
        })
        
    }

    async delete(clientId: string): Promise<void> {
        await prisma.client.delete({
            where: {id: clientId}
        })
    }
    async listAll(): Promise<Client[]> {
        const clientsData = await prisma.client.findMany();
        return clientsData.map(clientData => Client.create({
            id: clientData.id,
            phoneNumber: clientData.phoneNumber,
            fullName: clientData.fullName,
            email: clientData.email,
            address: clientData.address,
            city: clientData.city,
            state: clientData.state,
            country: clientData.country,
            postalCode: clientData.postalCode,
            tags: clientData.tags!,
            notes: clientData.notes,
            sourceId: clientData.sourceId,
            statusId: clientData.statusId,
            lastContactDate: clientData.lastContactDate,
            createdAt: clientData.createdAt,
            updatedAt: clientData.updatedAt,
            deletedAt: clientData.deletedAt
        }));
    }
}