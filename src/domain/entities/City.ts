import { Country } from "./Country"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number 
    @Column()
    name: String 
    @ManyToOne(() => Country)
    country : Country 
    constructor(id: number, name: string, country: Country){
        this.id = id 
        this.name = name 
        this.country = country 
    }
    
}