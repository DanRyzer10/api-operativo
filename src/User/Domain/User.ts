export class User {
    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly email: string,
        public readonly phoneNumber: string | null,
        public readonly createdAt: Date = new Date()
    ) {}

    public static create(id: string,name:string,email:string,phone:string): User {
        return new User(id,name,email,phone)
    }
}