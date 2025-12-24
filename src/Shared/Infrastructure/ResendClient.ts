import { Resend } from "resend";

export class ResendClient {
    private static instance: ResendClient;
    private resend : Resend;
    private constructor(){
        this.resend = new Resend(process.env.RESEND_API_KEY!);
    }
    public static getInstance() : ResendClient {
        if( !ResendClient.instance ) {
            ResendClient.instance = new ResendClient();
        }
        return ResendClient.instance;
    }
    public getResend() : Resend {
        return this.resend;
    }
}