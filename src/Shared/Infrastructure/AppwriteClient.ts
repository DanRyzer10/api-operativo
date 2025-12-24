import { Account, Client, Databases, Storage, Users } from "node-appwrite";

export class AppwriteClient {
    private static instance: AppwriteClient;
    private client   : Client;
    public databases : Databases;
    public account   : Account;
    public storage   : Storage;
    public users     : Users;


    constructor () {
        this.client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
            .setProject(process.env.APPWRITE_PROJECT_ID!)
            .setKey(process.env.APPWRITE_API_KEY!);

        this.databases = new Databases(this.client);
        this.account   = new Account(this.client);
        this.storage   = new Storage(this.client);
        this.users     = new Users(this.client);
    }

    public static getInstance() : AppwriteClient {
        if(!AppwriteClient.instance) {
            AppwriteClient.instance = new AppwriteClient();
        }
        return AppwriteClient.instance;
    }

    public getClient() : Client {
        return this.client;
    }
}