import { useAuth } from "@nuxtjs/auth-next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//API pour supprimer un utilisateur de la base de donnée par l'id
export default defineEventHandler(async (event) => {
  console.log("delete game");
  const body = await readBody(event);

  // Récupérer la session de l'utilisateur connecté
  const { value: session } = await useAuth();

  const idUser = session?.user?.id;
  const gameId = body.id_game; // Make sure that you have the correct game ID from the request body

  let entiteFirst;
  let entiteSecond;

  // Essaye de trouver l'entite de nom unique firstTerm
  try {
    entiteFirst = await prisma.entites.findUnique({
      where: {
        nom_entite: body.firstTerme,
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }
  // De même pour secondTerm
  try {
    entiteSecond = await prisma.entites.findUnique({
      where: {
        nom_entite: body.secondTerme,
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }
  // Puis on essaye de trouver le jeu a partir des données
  let idgame;
  if (entiteFirst && entiteSecond) {
    try {
      idgame = await prisma.game.findUnique({
        where: {
          idUser: idUser,
          idFirstTerm: entiteFirst.id_entite,
          idSecondTerm: entiteSecond.id_entite,
        },
        include: {
          firstTerme: true,
          secondTerme: true,
        },
      });
    } catch (error) {
      return {
        error: error,
      };
    }
  }
  // Puis on essaye de supprimer le jeu
  if (idgame) {
    try {
      const resp = await prisma.game.delete({
        where: {
          id_game: idgame.id_game, // Pass the correct game ID to delete the game
        },
      });

      return {
        success: true,
        message: `game with ID ${gameId} has been deleted.`,
        data: resp,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete game with ID ${gameId}.`,
        error: error,
      };
    }
  }
});
