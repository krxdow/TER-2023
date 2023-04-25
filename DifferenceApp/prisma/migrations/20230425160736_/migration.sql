-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "token_type" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "scope" TEXT,
    "id_token" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "game" (
    "id_game" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFirstTerm" INTEGER NOT NULL,
    "idSecondTerm" INTEGER NOT NULL,
    "idUser" TEXT NOT NULL,
    "number_of_play" INTEGER NOT NULL,
    "is_ajoute" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "game_idFirstTerm_fkey" FOREIGN KEY ("idFirstTerm") REFERENCES "entites" ("id_entite") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_idSecondTerm_fkey" FOREIGN KEY ("idSecondTerm") REFERENCES "entites" ("id_entite") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "entites" (
    "id_entite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom_entite" TEXT NOT NULL,
    "categorie" TEXT,
    "is_ajoute" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "differences" (
    "id_diff" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type_diff" TEXT NOT NULL DEFAULT 'CARACTERISTIQUE',
    "valeur_diff" TEXT NOT NULL,
    "idGame" INTEGER NOT NULL,
    CONSTRAINT "differences_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "game" ("id_game") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gameplayed" (
    "idGame" INTEGER NOT NULL,
    "idPlayer" TEXT NOT NULL,
    "startplay" DATETIME NOT NULL,
    "is_fini" BOOLEAN NOT NULL,
    "pourcentage" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "gameplayed_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "game" ("id_game") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "gameplayed_idPlayer_fkey" FOREIGN KEY ("idPlayer") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "game_idFirstTerm_key" ON "game"("idFirstTerm");

-- CreateIndex
CREATE UNIQUE INDEX "game_idSecondTerm_key" ON "game"("idSecondTerm");

-- CreateIndex
CREATE UNIQUE INDEX "game_idUser_key" ON "game"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "differences_idGame_key" ON "differences"("idGame");

-- CreateIndex
CREATE UNIQUE INDEX "gameplayed_idGame_key" ON "gameplayed"("idGame");

-- CreateIndex
CREATE UNIQUE INDEX "gameplayed_idPlayer_key" ON "gameplayed"("idPlayer");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");
