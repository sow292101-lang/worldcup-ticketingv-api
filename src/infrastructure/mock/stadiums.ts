import { Stadium } from "../../domain/entities/Stadium";
import { City } from "../../domain/entities/City";
import { cities } from "./cities";
export const stadiums = [
    new Stadium(1, "Mercedes-Benz Stadium", 67382, cities[0]),
    new Stadium(2, "Estadio Azteca", 72766, cities[1]),
    new Stadium(3, "BMO Field", 45000, cities[2])
]