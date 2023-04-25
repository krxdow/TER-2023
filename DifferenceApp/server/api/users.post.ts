import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    console.log("create post");
    const body = await readBody(event);
    const resp = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
        }
    });
    return { resp : resp}
})



