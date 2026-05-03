import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { Ticket } from "../../../domain/entities/Ticket"
import { TicketService } from "../../../application/services/TicketService"
import { CreateTicketSchema } from "./CreateTicketSchema"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { ConflictError } from "../../../domain/errors/ConflictError"
import { ValidationError } from "../../../domain/errors/ValidationError"

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json()

    const result = CreateTicketSchema.safeParse(body)
    if (!result.success) {
      throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" })
    }

    const ticketRepository = AppDataSource.getRepository(Ticket)
    const matchRepository = AppDataSource.getRepository(Match)
    const ticketService = new TicketService(ticketRepository, matchRepository)

    try {
      const ticket = await ticketService.create(
        result.data.matchId,
        result.data.seat,
        result.data.customer.firstname,
        result.data.customer.lastname,
        result.data.customer.email
      )

      return c.json({
        success: true,
        message: "Ticket created",
        data: {
          id: ticket.id,
          seat: ticket.seat,
          match: ticket.match,
          firstname: ticket.firstname,
          lastname: ticket.lastname,
          email: ticket.email
        }
      }, 201)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      if (e instanceof ConflictError) {
        throw new HTTPException(409, { message: e.message })
      }
      throw e
    }
  }
}