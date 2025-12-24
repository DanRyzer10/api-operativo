export class User {
    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly email: string,
        public readonly phoneNumber: string | null,
        public readonly role: string,
        public readonly createdAt: Date = new Date(),
        public readonly password: string | null = null,
    ) {}

    public static create(id: string,name:string,email:string,phone:string,role:string,password?:string): User {
        return new User(id,name,email,phone,role, new Date(), password);
    }
}