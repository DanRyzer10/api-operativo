import { Client } from "./Client";

export interface ClientRepository {
    save(client:Client): Promise<void>;
    findByPhoneNumber(phoneNumber: string): Promise<Client | null>;
    update(client:Client): Promise<void>;
    delete(clientId: string): Promise<void>;
    listAll(): Promise<Client[]>;

}