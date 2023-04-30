/*
  Warnings:

  - A unique constraint covering the columns `[nom_entite]` on the table `entites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entites_nom_entite_key" ON "entites"("nom_entite");
