import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


//api for deleting a user from the database by id
export default defineEventHandler(async (event) => {
    console.log("delete user");
    const body = await readBody(event);
    const userId = body.id; // Make sure that you have the correct user ID from the request body
   // const userName = body.name;

    try {
        const resp = await prisma.user.delete({
            where: {
                id: userId // Pass the correct user ID to delete the user
            }
        });

        return {
            success: true,
            message: `User with ID ${userId} has been deleted.`,
            data: resp
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to delete user with ID ${userId}.`,
            error: error
        };
    }
});
