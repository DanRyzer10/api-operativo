import { Resend } from "resend";
import { Email } from "../Domain/Email";
import { ResendClient } from "@/Shared/Infrastructure/ResendClient";

export class EmailService implements Email {
    private resendClient;
    private corporateEmail;

    constructor() {
        this.resendClient = ResendClient.getInstance().getResend();
        this.corporateEmail = process.env.CORPORATE_EMAIL!;
    }
    async sendEmail(to: string, subject: string, body: string): Promise<any> {
        return await this.resendClient.emails.send({
            to,
            from:this.corporateEmail,
            subject,
            html: body
        })
        
    }
}