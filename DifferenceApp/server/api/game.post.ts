import { useAuth } from "@nuxtjs/auth-next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// API pour creer un utilisateur dans la classe game
export default defineEventHandler(async (event) => {
  console.log("create post");
  const body = await readBody(event);

  // Récupérer la session de l'utilisateur connecté
  const { value: session } = await useAuth();

  // Création de la première entité
  const firstEntite = await prisma.entites.create({
    data: {
      nom_entite: body.firstTerme,
      is_ajoute: true,
    },
  });

  // Création de la deuxième entité
  const secondEntite = await prisma.entites.create({
    data: {
      nom_entite: body.secondTerme,
      is_ajoute: true,
    },
  });

  // Création du jeu avec les ID des entités associées
  if (firstEntite && secondEntite) {
    const resp = await prisma.game.create({
      data: {
        idFirstTerm: firstEntite.id_entite,
        idSecondTerm: secondEntite.id_entite,
        user: {
          connect: { id: session?.user?.id as string },
        },
        number_of_play: 0,
        is_ajoute: false,
      },
      include: {
        firstTerme: true,
        secondTerme: true,
      },
    });
  }

  return { resp: resp };
});
