import { Context } from "hono";
import { CreateTicketSchema } from "./CreateTicketSchema";
import { HTTPException } from "hono/http-exception";
import { Ticket } from "domain/entities/Ticket";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Match } from "domain/entities/Match";

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json()

    const result = CreateTicketSchema.safeParse(body)
    if (!result.success) {
      throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" })
    }

    const matchRepository = AppDataSource.getRepository(Match)
    const match = await matchRepository.findOne({
      where: { id: result.data.matchId },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    })
    if (!match) {
      throw new HTTPException(404, { message: `Match ${result.data.matchId} does not exist` })
    }

    const ticketRepository = AppDataSource.getRepository(Ticket)
    const siege = await ticketRepository
      .createQueryBuilder("ticket")
      .where("ticket.matchId = :matchId", { matchId: match.id })
      .andWhere("ticket.seat = :seat", { seat: result.data.seat })
      .getOne()

    if (siege) {
      throw new HTTPException(409, { message: `Seat '${result.data.seat}' is already taken for match ${match.id}` })
    }

    const newTicket = ticketRepository.create({
      match,
      seat: result.data.seat,
      firstname: result.data.customer.firstname,
      lastname: result.data.customer.lastname,
      email: result.data.customer.email
    })
    await ticketRepository.save(newTicket)

    return c.json({
      success: true,
      message: `Ticket created`,
      data: {
        id: newTicket.id,
        seat: newTicket.seat,
        match: newTicket.match,
        firstname: newTicket.firstname,
        lastname: newTicket.lastname,
        email: newTicket.email
      }
    }, 201)
  }
}
