import {Country} from "./Country"

export class Team {

    id:number
    name:string
    country:Country
    fifaCode:string

    constructor(id:number, name:string, country:Country, fifaCode:string){
        this.id = id
        this.name = name
        this.country = country
        this.fifaCode = fifaCode
    }

}