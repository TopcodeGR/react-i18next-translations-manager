import fs from "fs";

const findMissingTranslations = (
  localesPath: string,
  translations: string[]
) => {
  let localesDir = fs.readdirSync(localesPath);
  let missingTranslations: any = {};
  for (let locale of localesDir) {
    missingTranslations[locale] = [];
    let languageFile = fs.readFileSync(
      `${localesPath}/${locale}/translation.json`,
      {
        encoding: "utf8",
      }
    );
    let languageData = JSON.parse(languageFile);

    for (let key of translations) {
      let parsedKey = key.split(".");

      let translationValue = languageData[parsedKey[0]];
      if (!translationValue) {
        missingTranslations[locale].push(key);
        continue;
      }
      for (let keyPart of parsedKey.slice(1)) {
        translationValue = translationValue[keyPart];
      }
      if (!translationValue) {
        missingTranslations[locale].push(key);
      }
    }
  }

  return missingTranslations;
};

const findTranslations = (path: string) => {
  let translations: string[] = [];
  let currentDir = fs.readdirSync(path);

  for (let file of currentDir) {
    if (fs.lstatSync(`${path}/${file}`).isDirectory()) {
      translations = [...translations, ...findTranslations(`${path}/${file}`)];
    } else {
      let currentFile = fs.readFileSync(`${path}/${file}`, {
        encoding: "utf8",
      });

      for (let i = 0; i < currentFile.length; i++) {
        if (currentFile[i] == "t" && currentFile[i + 1] === "(") {
          if (currentFile[i - 1].match(/[a-zA-Z]+/)) {
            continue;
          }
          let j = i + 2;
          let currentTranslation = "";
          while (currentFile[j] !== ")" && j <= currentFile.length - 1) {
            currentTranslation += currentFile[j];
            j++;
          }
          translations.push(currentTranslation);
        }
      }
    }
  }
  translations = translations.map((e) => {
    if (e[0] == "'" || e[0] === '"') {
      e = e.slice(1);
    }
    if (e[e.length - 1] == "'" || e[e.length - 1] === '"') {
      e = e.slice(0, e.length - 1);
    }
    return e;
  });

  translations = translations.filter((e) => {
    return e[0]?.match(/[a-zA-Z]+/) && !e.match(/\s/);
  });
  return translations;
};

export { findMissingTranslations, findTranslations };

