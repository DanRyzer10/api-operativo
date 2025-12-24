export interface Email {
    sendEmail(to:string, subject: string, body:string): Promise<any>;
}