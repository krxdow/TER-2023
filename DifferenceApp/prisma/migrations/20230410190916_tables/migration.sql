/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "age" INTEGER NOT NULL,
    "birthday" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "type_user" TEXT NOT NULL DEFAULT 'JOUEUR'
);

-- CreateTable
CREATE TABLE "Entites" (
    "id_entite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_entite" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "is_ajoute" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Game" (
    "id_game" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFirstTerm" INTEGER NOT NULL,
    "idSecondTerm" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "number_of_play" INTEGER NOT NULL,
    "is_ajoute" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Game_idFirstTerm_fkey" FOREIGN KEY ("idFirstTerm") REFERENCES "Entites" ("id_entite") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_idSecondTerm_fkey" FOREIGN KEY ("idSecondTerm") REFERENCES "Entites" ("id_entite") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Differences" (
    "id_diff" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_diff" TEXT NOT NULL DEFAULT 'CARACTERISTIQUE',
    "valeur_diff" TEXT NOT NULL,
    "idGame" INTEGER NOT NULL,
    CONSTRAINT "Differences_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id_game") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GamesPlayed" (
    "idGame" INTEGER NOT NULL,
    "idPlayer" INTEGER NOT NULL,
    "startplay" DATETIME NOT NULL,
    "is_fini" BOOLEAN NOT NULL,
    "pourcentage" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "GamesPlayed_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id_game") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GamesPlayed_idPlayer_fkey" FOREIGN KEY ("idPlayer") REFERENCES "Users" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Game_idFirstTerm_key" ON "Game"("idFirstTerm");

-- CreateIndex
CREATE UNIQUE INDEX "Game_idSecondTerm_key" ON "Game"("idSecondTerm");

-- CreateIndex
CREATE UNIQUE INDEX "Game_idUser_key" ON "Game"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Differences_idGame_key" ON "Differences"("idGame");

-- CreateIndex
CREATE UNIQUE INDEX "GamesPlayed_idGame_key" ON "GamesPlayed"("idGame");

-- CreateIndex
CREATE UNIQUE INDEX "GamesPlayed_idPlayer_key" ON "GamesPlayed"("idPlayer");
