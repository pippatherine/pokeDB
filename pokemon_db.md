# Pokémon ETL Application

Create an application which **Extracts** data from the [PokeAPI](https://pokeapi.co), **Transforms** the shape of the data to suit our needs, and **Loads** it into a Postgres database.

You'll need to design the structure of the database yourself.

Below is the minimum data that is expected to be stored. I probably wouldn't recommend this structure though!

| id  | pokemon   | height | weight | sprite  | types           | moves                                                                                               |
| --- | --------- | ------ | ------ | ------- | --------------- | --------------------------------------------------------------------------------------------------- |
| 1   | bulbasaur | 7      | 69     | img_url | [grass, poison] | [{name: razor-leaf, description:, pp: , power: ,}, {name: tackle, description: ,pp: , power: ,}...] |
| ... |           |        |        |         |                 |                                                                                                     |
| 151 | mew       | 4      | 40     | img_url | [psychic]       | [{name: pound, description:, pp: , power ,},{name: take-down, description:, pp: , power ,}...]      |

Database structure: https://docs.google.com/spreadsheets/d/17BamHDVOIUb36dUYGhF4Zomu9ZSiQIFdS8gF8gG2MJM/edit?usp=sharing
