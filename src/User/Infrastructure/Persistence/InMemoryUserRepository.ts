import { User } from "../../Domain/User";
import { UserRepository } from "../../Domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    private users:User[] = [];
    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }
}