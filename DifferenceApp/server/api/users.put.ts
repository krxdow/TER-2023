import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    console.log("update user by name");
    const body = await readBody(event);
    const userName = body.name; // Make sure that you have the correct user name from the request body
    const  updatedUserData = {
        email: body.email, // Update with the correct email from the request body
        password: body.password, // Update with the correct password from the request body
        role: body.role // Update with the correct role from the request body
    };

    try {
        const resp = await prisma.user.updateMany({
            where: {
                name: userName // Pass the correct user name to update the user
            },
            data: updatedUserData
        });

        return {
            success: true,
            message: `Users with name ${userName} have been updated.`,
            data: resp
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to update users with name ${userName}.`,
            error: error
        };
    }
});
