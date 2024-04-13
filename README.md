# Depende Quiz Datos

A simple quiz game to test if you really know about "Fundamentos de Organizacion de Datos" and "Diseño de Base de Datos"
or if it's just a matter of the questions being about the few topics you know.

Available at [josu-dev.github.io/Depende-Quiz-Datos](https://josu-dev.github.io/Depende-Quiz-Datos/).

## Disclaimer

The quiz can be either about "Fundamentos de Organizacion de Datos" or "Diseño de Base de Datos". Each quiz has a set of multiple choice questions with only one is supposed to be correct. The Data for each set was taken from different sources and is not guaranteed to be accurate.

## Contributing

To contribute with a new quiz or to add/correct existing questions feel free to open a pull request. The sets of questions are stored in the [src/lib/content/](./src/lib/content/) directory where each file represents a different quiz. The format for the questions is as follows:

```json
[
  {
    "sentence": "Un checkPoint en ambientes concurrentes", // The question text
    "options": [
      [
        "a", // The option index (a, b, c, d, e, f, g...) that will be used to match the answer
        "Solo se genera si se utiliza el protocolo de HDE" // The option text
      ],
      [
        "b",
        "Solo se genera si se utiliza el protocolo de dos fases"
      ],
      [
        "c",
        "Se aplica en el protocolo de doble paginación"
      ],
      [
        "d",
        "Se coloca siempre entre dos transacciones, cuando ninguna esta activa"
      ],
      [
        "e",
        "Todas las anteriores"
      ],
      [
        "f",
        "Algunas de las anteriores"
      ],
      [
        "g",
        "Ninguna de las anteriores"
      ]
    ],
    "answers": [  // The correct answer/s (valid values are the option indexes defined above, any text or an empty array)
      "g"
    ]
  }
]
```

## License

[MIT](./LICENSE)
