DROP TABLE IF EXISTS Jouer;
DROP TABLE IF EXISTS RelationInPartie;
DROP TABLE IF EXISTS Parties;
DROP TABLE IF EXISTS Joueur;
DROP TABLE IF EXISTS Relations;
DROP TABLE IF EXISTS Entites;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	id_users INT(10) NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	age INT(100),
	birthday DATE,
	email VARCHAR(100),
	pass_word VARCHAR(100),
	PRIMARY KEY (id_users)
);

CREATE TABLE Entites (
	id_entite INT(10) NOT NULL AUTO_INCREMENT,
	nom_entite VARCHAR(50), 
	categorie VARCHAR(50),
    is_ajoute INT(1), -- boolean
	PRIMARY KEY (id_entite)
);


CREATE TABLE Relations (
	id_relation INT(100) NOT NULL AUTO_INCREMENT, 
	id_entite1 INT(100),
	type_relation INT(100),
	id_entite2 INT(100),
	valeur_relation VARCHAR(100),
	is_ajoute INT(1) DEFAULT 0, -- boolean
	PRIMARY KEY (id_relation),
	FOREIGN KEY (id_entite1) REFERENCES Entites(id_entite),
	FOREIGN KEY (id_entite2) REFERENCES Entites(id_entite)
);


CREATE TABLE Joueur (
	id_joueur INT(100) NOT NULL AUTO_INCREMENT,
	nom_joueur VARCHAR(100),
	prenom_joueur VARCHAR(100),
	age_joueur INT(100),
	date_naissance DATE,
	email VARCHAR(100),
    mot_de_passe VARCHAR(100),
	PRIMARY KEY (id_joueur)
);


CREATE TABLE Parties (
    id_partie INT(100) NOT NULL AUTO_INCREMENT,
	idEntite1 INT(100),
	idEntite2 INT(100),
    idJoueur INT(100),
	nb_fois_jouer INT(100),
	PRIMARY KEY (id_partie),
	FOREIGN KEY (idEntite1) REFERENCES Entites(id_entite),
	FOREIGN KEY (idEntite2) REFERENCES Entites(id_entite),
	FOREIGN KEY (idJoueur) REFERENCES Joueur(id_joueur)
);


CREATE TABLE RelationInPartie (
    idRelation INT(100),
	idPartie INT(100),
    PRIMARY KEY (idRelation, idPartie),
	FOREIGN KEY (idRelation) REFERENCES Relations(id_relation),
	FOREIGN KEY (idPartie) REFERENCES Parties(id_partie)
);


CREATE TABLE Jouer (
	idPartieCreer INT(100),
	idJoueur INT(100),
	is_finie INT(1),    -- boolean qui indique que la partie est fini, en cours ou finie mais pas decompter totalement
	pourcentage INT(100),
	point_gagne INT(100),
	PRIMARY KEY (idPartieCreer, idJoueur),
	FOREIGN KEY (idPartieCreer) REFERENCES Parties(id_partie),
	FOREIGN KEY (idJoueur) REFERENCES Joueur(id_joueur)
);