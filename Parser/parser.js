// Lecture du fichier pour le parser
const fs = require("fs");

let sections = []; //section pour toutes les parties
let section = []; //section pour chaque partie

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
      // On boucle jusqu'à la fin du commentaire
      while (!lines[i].trim().endsWith("</.>")) {
        i++;
      }
      continue;
    }
  }

  sections.pop();
  console.log(sections);

  for (var sec of sections) {
    let structure = sec[0]; //recuperer la strucuture
    let str = structure.trim();
    let struct = str.split(";"); //split enfonction des données
    console.log("struct", struct);

    //creation des variables en fonction
    var nb_var = 0;
    for (let i = 0; i < struct.length; i++) {
      let variableName = struct[i];
      let variableValue = "";
      variableName = variableName.replace("'", "");
      variableName = variableName.replace("'", "");

      console.log(variableName + " : " + variableValue);
      // création dynamique de la variable
      eval("var " + variableName + " = '" + variableValue + "';");
      nb_var++;
    }
    console.log("nb_var : ", nb_var);
    let vars = [];

    sec.forEach((s) => {
      vars = [];
      const var_names = Array.from(
        { length: nb_var },
        (_, i) => `var_${i + 1}`
      );
      vars = var_names;
      const var_declarations = var_names.join(", ");

      const code = `const [${var_declarations}] = s.split(";");`;

      console.log("Vars ", vars);
      eval(code);

      for (let v of vars) {
        console.log(`${v} : ${eval(v)}`);
        console.log("--------------------");
      }
    });
  }
});
