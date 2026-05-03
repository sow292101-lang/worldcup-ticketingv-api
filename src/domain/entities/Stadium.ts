import { City } from "./City"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
@Entity()
export class Stadium {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    capacity:number
    @ManyToOne(() => City)
    city:City
    constructor(i: number, n: string, c: number, ci : City){
   this.capacity = c
   this.city = ci 
   this.id = i 
   this.name = n 
    if (this.capacity<= 0){
        throw new Error("la capacite dois etre superieur a 0 ")
    }
    }
    

}