import { Country } from "./Country"
export class City {
    id: number 
    name: String 
    country : Country 
    constructor(id: number, name: string, country: Country){
        this.id = id 
        this.name = name 
        this.country = country 
    }
    
}