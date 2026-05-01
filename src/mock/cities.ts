import { City } from "../domain/entities/City";
import { countries } from "./contries";
export const cities = [
    new City(1, "Atlanta", countries[0]),
    new City(2, "Mexico  City", countries[1]),
    new City(3, "Toronto", countries[2]),
]