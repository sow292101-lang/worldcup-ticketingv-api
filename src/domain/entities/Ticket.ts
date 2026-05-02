import { Match } from "./Match"
import { Customer } from "./Customer"


export class Ticket {
    id: number
    match: Match
    seat: string
    customer: Customer

    constructor(id: number, match: Match, seat: string, customer : Customer) {
        if (id <= 0) {
            throw new Error("L'id doit être supérieur à 0")
        }
        if (!seat || seat.trim() === "") {
            throw new Error("Le siège ne peut pas être vide")
        }

        this.id = id
        this.match = match
        this.seat = seat
        this.customer = customer
    }
}