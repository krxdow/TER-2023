// Lecture du fichier pour le parser
const fs = require("fs");

let sections = []; //section pour toutes les parties
let section = []; //section pour chaque partie
/*
// Lien vers reseauDUMP
let response = await fetch(
  "https://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=crocodile&rel=&relin=norelin",
  {
    mode: "no-cors",
  }
);
// Recuperation des données de reseauDump
const body = await response.text(); //recupere les données en brut du site
let $ = cheerio.load(body); //mettre dans un objet pour pouvoir le manipuler

// Selection des données du site
const selected = $("div code").html(); //cherche dans le code source, la balise code pour pouvoir recuperer ce qu'il y a dedans

// Ecriture dans un texte
fs.writeFile("./selected.txt", selected, function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(
      "\n\nLes données ont été écrites dans le fichier selected.txt\n\n"
    );
  }
});
*/
fs.readFile("selected.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // On ignore les commentaires
    if (line.startsWith("//")) {
      section = [];
      // Declaration des données
      const line_sans_espace = line.trim(); //suppression des espaces
      const part = line_sans_espace.split(":"); //split de la ligne par : pour avoir la structure

      // Si le commentaire n'a pas de structure il est ignorer
      if (typeof part[1] === "undefined") {
        continue;
      }
      section.push(part[1]);
      // Sinon on recupere toutes les lignes qui sont après pour recuperer les données
      while (!lines[i + 1].trim().startsWith("//")) {
        section.push(lines[i + 1]); //ajout a la liste
        i++; //passe a la ligne suivante
      } //on ne change rien car on a aps besoin des relations sortantes

      // Suppression des case vides
      while (section.includes("")) {
        let index = section.indexOf(""); //retrouve les cases vides
        if (index !== -1) {
          section.splice(index, 1); //supprime la case
        }
      }

      // Affichage
      if (section.length !== 0) {
        //console.log("Section : ", section);
        sections.push(section);
      }
    }

    // On igonre les lignes <def></def>
    if (line.startsWith("<.>")) {
      // On boucle jusqu'à la fin de la balise
      while (!lines[i].trim().endsWith("</.>")) {
        i++;
      }
      continue;
    }
  }

  sections.pop(); //on supprime la derniere cases qui sont les relations sortantes
  console.log(sections); //on affiche ceque ca nous donne

  // Parcourt de sections
  for (var sec of sections) {
    let structure = sec[0]; //recuperer la strucuture
    let str = structure.trim();
    let struct = str.split(";"); //split enfonction des données
    console.log("struct : ", struct);

    //creation des variables en fonction
    var nb_var = 0;
    let variableNames = [];
    let variableValues = [];

    console.log("taille : ", struct.length);
    for (let i = 0; i < struct.length; i++) {
      let variableName = struct[i];
      let variableValue = "";
      variableName = variableName.replace(" ", "_");
      variableName = variableName.replace("'", "");
      variableName = variableName.replace("'", "");

      variableNames.push(variableName);
      variableValues.push(variableValue);

      nb_var++;
    }

    // Création dynamique des variables en dehors de la boucle
    for (let i = 0; i < nb_var; i++) {
      console.log(variableNames[i], " : ", variableValues[i]);
      eval(`var ${variableNames[i]} = '${variableValues[i]}'`);
    }

    console.log("nb_var : ", nb_var);

    for (var s of sec) {
      if (s === sec[0]) {
        continue;
      }

      let tab_valeur = s.trim();
      tab_valeur = tab_valeur.split(";");
      console.log(tab_valeur);

      for (var i = 0; i < tab_valeur.length; i++) {
        tab_valeur[i] = tab_valeur[i].replace("�", "&");
        var nb_apos = 0;
        while (tab_valeur[i].includes("'")) {
          tab_valeur[i] = tab_valeur[i].replace("'", "");
          nb_apos++;
        }
        tab_valeur[i] = "'" + tab_valeur[i] + "'";

        const code = `var ${variableNames[i]} = ${tab_valeur[i]}`;
        eval(code);
      }

      for (const varName of variableNames) {
        console.log(`${varName} = ${eval(varName)}`);
      }

      console.log("--------------------");
    }

    console.log("--------------------\n");
  }
});
