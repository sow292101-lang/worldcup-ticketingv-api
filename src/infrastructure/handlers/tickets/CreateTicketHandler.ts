
import { Context } from "hono";
import { CreateTicketSchema } from "./CreateTicketSchema";
import { HTTPException } from "hono/http-exception";
import { Ticket } from "domain/entities/Ticket";
import { tickets } from "infrastructure/mock/tickets";
import { matchs } from "infrastructure/mock/matchs";
import { Customer } from "domain/entities/Customer";

export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json()

       
        const result = CreateTicketSchema.safeParse(body)
        if (!result.success) {
            throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" })
        }
        
        const match = matchs.find(m => m.id === result.data.matchId)
        if (!match) {
            throw new HTTPException(404, { message: `Match ${result.data.matchId} does not exist` })
        }
        
        const siege = tickets.find(t => t.match.id === match.id && t.seat === result.data.seat)
        if(siege){
            throw new HTTPException(409, {message: `Seat '${result.data.seat}' is already taken for match ${match.id}`})
        }
        
        const newticket = new Ticket(
            tickets.length + 1,
            match,
            result.data.seat,
            new Customer(result.data.customer.firstname, result.data.customer.lastname, result.data.customer.email)
        )
        
        tickets.push(newticket)
        return c.json({
            success: true,
            message: `Ticket created`,
            data: newticket
        }, 201)
    }
}