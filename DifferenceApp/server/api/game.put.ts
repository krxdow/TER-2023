import { useAuth } from "@nuxtjs/auth-next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// API pour modifier un utilisateur dans la classe game
export default defineEventHandler(async (event) => {
  console.log("update game by name");
  const body = await readBody(event);

  // Récupérer la session de l'utilisateur connecté
  const { value: session } = await useAuth();

  const gameId = body.name; // Make sure that you have the correct game name from the request body
  const updatedgameData = {
    difference: body.difference,
  };

  try {
    const resp = await prisma.game.updateMany({
      where: {
        id_game: gameId, // Pass the correct game id to update the game
      },
      data: updatedgameData,
    });

    return {
      success: true,
      message: `games with name ${gameId} have been updated.`,
      data: resp,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update games with name ${gameId}.`,
      error: error,
    };
  }
});
