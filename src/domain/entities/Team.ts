import {Country} from "./Country"


export class Team {

    id:number
    name:string
    country:Country
    code: {value: string}

    constructor(id:number, name:string, country:Country, code:string){
         if (!/^[A-Z]{3}$/.test(code)) {
      throw new Error("Le code FIFA doit contenir 3 lettres majuscules")
    }
        this.id = id
        this.name = name
        this.country = country
        this.code = {value : code}
    }

}