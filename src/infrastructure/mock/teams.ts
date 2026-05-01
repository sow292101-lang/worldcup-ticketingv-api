import { Team } from "../../domain/entities/Team"
import { countries } from "./contries"

export const teams = [
    new Team(1, "France", countries[0], "FRA"),
    new Team(2, "Brazil", countries[0], "BRA"),
    new Team(3, "Argentina", countries[0], "ARG"),
    new Team(4, "Germany", countries[0], "GER"),
    new Team(5, "Spain", countries[0], "ESP"),
    new Team(6, "England", countries[0], "ENG")
]