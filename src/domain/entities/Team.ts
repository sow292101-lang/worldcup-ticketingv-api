import {Country} from "./Country"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @ManyToOne(() => Country)
    country:Country
    
    @Column({
        transformer: {
            to: (value: { value: string }) => value.value,
            from: (value: string) => ({ value })
        } })
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