export interface AppwriteAuthService {
    createUser(email: string, password: string,name:string) : Promise<{userId: string; sessionToken: string}>;
    authenticateUser(email:string,password:string): Promise<string>;
    getCurrentUser(sessionToken: string): Promise<any>;
    logout(sessionId: string): Promise<void>;
    getUserById(userId: string): Promise<any>;
}