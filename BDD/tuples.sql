------------
-- TUPLES --
------------

-- Entites(nom_entite, categorie, is_ajoute)
INSERT INTO Entites VALUES  (0, "Aligator", "Animal", 0);
INSERT INTO Entites VALUES  (1, "Crocodile", "Animal", 0);

-- Relations(id_entite1, type_relation, id_entite2, valeur_relation, is_ajoute)
INSERT INTO Relations VALUES  (0, 0, "lieu de vie", 1, "afrique", 0);

-- Joueur(nom_joueur, prenom_joueur, age_joueur, date_naissance, email, mot_de_passe)
INSERT INTO Joueur VALUES  (0, "Toto", "Toto", 10, 20/12/2013, toto.toto@gmail.com, totototo);

-- Parties
INSERT INTO Parties VALUES  ();