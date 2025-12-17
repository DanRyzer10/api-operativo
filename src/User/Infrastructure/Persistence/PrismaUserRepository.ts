import { User } from "../../Domain/User";
import { UserRepository } from "../../Domain/UserRepository";
import { prisma } from "../../../Shared/Infrastructure/PrismaClient";

export class PrismaUserRepository implements UserRepository {

    async save(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData =  await prisma.user.findUnique({where: {email}});
        if(!userData) return null;
        return new User(userData.id,userData.name,userData.email);
        
    }
}