import { User } from "../../Domain/User";
import { UserRepository } from "../../Domain/UserRepository";
import { prisma } from "../../../Shared/Infrastructure/PrismaClient";

export class PrismaUserRepository implements UserRepository {

    async save(user: User): Promise<void> {
        await prisma.user.create({
            data :{
                name: user.name,
                email: user.email,
                id: user.id!,
                phoneNumber: user.phoneNumber,
                
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData =  await prisma.user.findUnique({where: {email}});
        if(!userData) return null;
        return User.create(userData.id,userData.name,userData.email,userData.phoneNumber!,userData.role!);
        
    }
}