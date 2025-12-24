
import {randomBytes, scrypt} from 'node:crypto';
import { promisify } from 'node:util';
export class EncriptoUtil {
    private static scrypt = promisify(scrypt);
    public static async encryptPassword(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');

        const derivedKey :any = await EncriptoUtil.scrypt(password,salt,64);

        return `${salt}:${derivedKey.toString('hex')}`;
    }
    public static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const [salt, key] = hashedPassword.split(':');
        const derivedKey:any = await EncriptoUtil.scrypt(password,salt,64);
        return key === derivedKey.toString('hex');
    }
}