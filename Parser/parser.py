import requests
import io
import json

# Demander à l'utilisateur de rentrer une phrase
phrase = input("Entrez une phrase à chercher : ")
print("Le phrase que vous avez entré est :", phrase)

# Exploiter la phrase
phr = phrase.split(" ")
print("\n\n",phr)

# Dictionnaire pour tous les mots de la phrase
dico_entier = {}

for p in phr :
    
    print("\n\n",p)
    
    # Remplir le dico
    dico_entier[p] = []

    # Faire la requête HTTP
    url = "https://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel="+p+"&rel="
    response = requests.get(url)

    # Recuperation des données de reseauDump dans body
    body = response.text

    # Recherche de la position de la première occurrence de la balise <CODE> pour récuperer les choses à l'interieur
    start_index = body.find("<CODE>")

    # Recuperation du texte du code source
    selected = "" 

    # Si le phrase existe dans la base
    if start_index != -1:
        # Recherche de la position de la fin de la balise </CODE>
        end_index = body.find("</CODE>", start_index)

        if end_index != -1:
            # Extraction du contenu entre les balises <CODE> et </CODE>
            code_content = body[start_index + len("<CODE>"):end_index]
            selected += code_content  # ajout à la chaine de caractere
            
    # Sinon on regarde si il y a un message d'erreur qui dit que le phrase existe pas
    else :
        start_index_warning = body.find(u"""<div class="jdm-warning">""")
        if start_index_warning != -1 :
            selected = "Le mot "+p+" dans la phrase n'existe pas"
            print("\nLe mot dans la phrase n'existe pas")
    #print(selected)

    # Ecriture dans un texte
    with open("./selected_python.txt", "w") as f:
        f.write(selected)
    print("\n\nLes données ont été écrites dans le fichier selected_python.txt\n\n")


    # Bossage avec le fichier mtn

    donnees_par_categorie = {}

    with open('selected_python.txt', 'r') as file :
        
        categorie_actuelle = "None"
        a_l_interieur_de_la_balise = False
        lignes = file.readlines()

        
        for ligne in lignes:
            if ligne.startswith('\n') :
                continue
            # On igonre les lignes <def></def> si on est dedans on cherche
            elif a_l_interieur_de_la_balise:
                if ligne.strip() == "</def>":
                    a_l_interieur_de_la_balise = False
                continue
            # On ignore si c'est la ligne
            elif ligne.strip() == "<def>":
                a_l_interieur_de_la_balise = True
                continue
            # Si c'est une ligne de commentaire
            if ligne.startswith('//') and not ":" in ligne:
                continue
            if ligne.startswith('//') and ":" in ligne:
                #print(ligne)
                if ((len(donnees_par_categorie.get(categorie_actuelle, [])) == 0) and len(donnees_par_categorie) != 0) : # si la categorie est vide alors on saute le commentaire
                    #print("vide")
                    continue
                # Sinon on a trouvé une nouvelle catégorie
                categorie_actuelle = ((ligne.strip()[2:]).split(":"))[1]
                #print("cate", categorie_actuelle)
                donnees_par_categorie[categorie_actuelle] = []
            # Sinon
            else:
                # On ajoute la ligne à la catégorie courante
                if categorie_actuelle is not None:
                    donnees_par_categorie[categorie_actuelle].append(ligne.strip().split(';'))
                    
                    
    #print(donnees_par_categorie)


    # Exploitation par categorie mtn

    # les relations sortante accede aux donnéespar des id et on doit associé l'id
    
    dico_entier[p] = donnees_par_categorie
    
print(dico_entier)
# Ecriture dans un texte
with open("./tab_python.txt", "w") as f:
    json.dump(dico_entier, f)
print("\n\nLes données ont été écrites dans le fichier tab_python.txt\n\n")
