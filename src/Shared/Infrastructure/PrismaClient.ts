import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma : PrismaClient};
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { CONNECTION_LIMIT, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from "../../constants";
const adapter = new PrismaMariaDb({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    connectionLimit: Number(CONNECTION_LIMIT) 
})

export const prisma = globalForPrisma.prisma || new PrismaClient({adapter});


if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;