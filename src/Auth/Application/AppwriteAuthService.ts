import { AppwriteClient } from "@/Shared/Infrastructure/AppwriteClient";
import { AuthService } from "../Domain/AuthService";
import { Primitive } from "zod/v3";
import { ID } from "node-appwrite";
import { ca } from "zod/v4/locales";

export class AppwriteAuthService implements AppwriteAuthService {
    private appwriteCient: AppwriteClient;

    constructor() {
        this.appwriteCient = AppwriteClient.getInstance();
    }
    async createUser(email: string, password: string,name:string) : Promise<{userId: string; sessionToken: string}> {
        try {
            const user = await this.appwriteCient.users.create(
                ID.unique(),
                email,
                undefined,
                password,
                name
            );

            const session = await this.appwriteCient.account.createEmailPasswordSession(email,password);


            return {
                userId: user.$id,
                sessionToken: session.$id
            }
        }catch( error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async authenticateUser(email:string,password:string): Promise<string> {
        try {
            const session = await this.appwriteCient.account.createEmailPasswordSession(email,password);
            return session.$id;
        }catch( error: any) {
            throw new Error(`Error authenticating user: ${error.message}`);
        }
    }
    async getCurrentUser(sessionToken: string): Promise<any> {
        try {
            const account = this.appwriteCient.account;
            return await account.get();

        }catch( error: any) {
            throw new Error(`Error getting current user: ${error.message}`);
        }
    }
    async logout(sessionId: string): Promise<void> {
        try {
            await this.appwriteCient.account.deleteSession(sessionId);
        } catch (error: any) {
            throw new Error(`Error logging out: ${error.message}`);
        }
    }

    /**
     * Obtiene un usuario por su ID desde Appwrite
     */
    async getUserById(userId: string): Promise<any> {
        try {
            return await this.appwriteCient.users.get(userId);
        } catch (error: any) {
            throw new Error(`Error getting user by ID: ${error.message}`);
        }
    }
}