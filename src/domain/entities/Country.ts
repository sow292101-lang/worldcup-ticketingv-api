import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number 
    @Column()
    name: string 
    @Column()
    code: string

    constructor(id : number, n : string, c : string){
        this.id = id 
        this.name = n 
        this.code = c 
    }

}