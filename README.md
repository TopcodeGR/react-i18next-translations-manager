<!-- GETTING STARTED -->

## Getting Started

react-i18next-translations-manager is a small package that helps users of react-i18n next that utilize local translation files to manage them better.
It scans a given directory recursively, to find the translation keys used in the source code. It provides another utility function that given the path of the locale files, returns the translation keys that are not present for each language.

### Prerequisites

You must be using react-i18next in your project, along with local translation files.
The translation files must be named _translation.json_ and be located under a directory with the locale name.

Example structure:

```
├── src
│   ├── components
│   │   ├── **/*.tsx
├── public
│   ├── locales
│   │   ├── EN
│   │       ├── translation.json
│   │   ├── FR
│   │       ├── translation.json
│   │   ├── ES
│   │       ├── translation.json
│   ├── images
│   ├── js
│   ├── index.html
├── dist
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore

```

### Installation

1. Go in your project's root directory
2. Run the following command
   ```sh
   npm i react-i18next-translations-manager
   ```

<!-- USAGE EXAMPLES -->

## Example

```sh
import {
  findMissingTranslations,
  findTranslations,
} from "react-i18next-translations-manager";

let translations = findTranslations(`../../my-project/src/components`)

/* OUTPUT
[
    "key1",
    "key2",
    "key3",
    "nested.key4",
    ...
]
/*

let missingTranslations = findMissingTranslations(`../../my-project/public/locales`,translations);

/* OUTPUT
{
    "EN":{
        "key1",
        "nested.key4"
        ...
    },
    "GR":{
        "key2"
        "nested.key4",
        ...
    },
    "FR":{
        "key1"
    },
    "ES":{
        "key2"
    }
    ...
}
/*
```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

