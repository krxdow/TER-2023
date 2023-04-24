import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//API pour supprimer un utilisateur de la base de donnée par l'id
export default defineEventHandler(async (event) => {
  console.log("delete user");
  const body = await readBody(event);
  const userId = body.id_user; // Make sure that you have the correct user ID from the request body
  // const userName = body.name;

  try {
    const resp = await prisma.user.delete({
      where: {
        id_user: userId, // Pass the correct user ID to delete the user
      },
    });

    return {
      success: true,
      message: `User with ID ${userId} has been deleted.`,
      data: resp,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete user with ID ${userId}.`,
      error: error,
    };
  }
});
