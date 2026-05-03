import { Repository } from "typeorm"
import { Ticket } from "../../domain/entities/Ticket"
import { Match } from "../../domain/entities/Match"
import { NotFoundError } from "domain/errors/NotFoundError"
import { ConflictError } from "domain/errors/ConflictError"

export class TicketService {
    private readonly ticketRepository: Repository<Ticket>
    private readonly matchRepository: Repository<Match>

    constructor(ticketRepository: Repository<Ticket>, matchRepository: Repository<Match>) {
        this.ticketRepository = ticketRepository
        this.matchRepository = matchRepository
    }

    async create(matchId: number, seat: string, firstname: string, lastname: string, email: string): Promise<Ticket> {
        const match = await this.matchRepository.findOneBy({ id: matchId })
        if (!match) {
            throw new NotFoundError(`Match ${matchId} does not exist`)
        }

        const tickets = await this.ticketRepository.find({
            relations: ["match"]
        })
        const existingTicket = tickets.find(t => t.match.id === matchId && t.seat === seat)

        if (existingTicket) {
            throw new ConflictError(`Seat "${seat}" is already taken for match ${matchId}`)
        }

        const ticket = this.ticketRepository.create({
            match,
            seat,
            firstname,
            lastname,
            email
        })

        return await this.ticketRepository.save(ticket)
    }

    async findAll(): Promise<Ticket[]> {
        return await this.ticketRepository.find({
            relations: ["match"]
        })
    }
}