import { join } from "node:path";
import { Email } from "../Domain/Email";
import { ResendClient } from "@/Shared/Infrastructure/ResendClient";
import { readFile } from "node:fs/promises";
import { object } from "zod";

export interface WelcomeEmailData {
    nombre: string;
    email: string;
    linkPlataforma?: string;
    nombrePlataforma?: string;
    linkConfiguracion?: string;
    direccionEmpresa?: string;
    linkFacebook?: string;
    linkTwitter?: string;
    linkInstagram?: string;
}

export class EmailService implements Email {
    private templateCache: Map<string,string> = new Map();
    private resendClient;
    private corporateEmail;
    private templatesPath: string;

    constructor(templatesPath: string = 'src/assets/templates') {
        this.resendClient = ResendClient.getInstance().getResend();
        this.corporateEmail = process.env.CORPORATE_EMAIL!;
        this.templatesPath = templatesPath;
    }
    async sendEmail(to: string, subject: string, body: string): Promise<any> {
        return await this.resendClient.emails.send({
            to,
            from:this.corporateEmail,
            subject,
            html: body
        })
        
    }

    async getWelcomeEmail(data: WelcomeEmailData):Promise<string> {
        const template = await this.loadTemplate('welcome-email.html');
        const defaultData = {
            nombre: data.nombre,
            email: data.email,
            linkPlataforma: data.linkPlataforma || 'https://tudominio.com/dashboard',
            nombrePlataforma: data.nombrePlataforma || 'Nuestra Plataforma',
            linkConfiguracion: data.linkConfiguracion || 'https://tudominio.com/configuracion',
            direccionEmpresa: data.direccionEmpresa || 'Tu dirección empresarial',
            linkFacebook: data.linkFacebook || '#',
            linkTwitter: data.linkTwitter || '#',
            linkInstagram: data.linkInstagram || '#'
        } 
        return this.replaceVariables(template,defaultData);       
    }

    private async loadTemplate(templateName: string):Promise<string> {
        if(this.templateCache.has(templateName)) {
            return this.templateCache.get(templateName)!;
        }

        const templatesPath = join(this.templatesPath,templateName);

        const template      = await readFile(templatesPath,'utf-8');
        this.templateCache.set(templateName,template);
        return template;
    }
    private replaceVariables(template:string,data:Record<string,string>) : string {
        let result = template;
        for(const [key,value] of Object.entries(data)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result      = result.replace(regex,value || ''); 
        }
        return result;
    }
}