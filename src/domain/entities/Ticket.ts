import { Match } from "./Match"
import { Customer } from "./Customer"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Match)
    match: Match
    @Column()
    seat: string
    @Column()
    firstname !: string

    @Column()
    lastname !: string

    @Column()
    email !: string

    constructor(id: number, match: Match, seat: string,  firstname: string, lastname: string, email: string) {
       if (id && id <= 0) {
        throw new Error("L'id doit être supérieur à 0")
    }
    if (seat !== undefined && (!seat || seat.trim() === "")) {
        throw new Error("Le siège ne peut pas être vide")
    }

        this.id = id
        this.match = match
        this.seat = seat
         this.firstname = firstname
        this.lastname = lastname
        this.email = email
    }
}