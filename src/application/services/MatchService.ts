import { Repository } from "typeorm"
import { Match } from "../../domain/entities/Match"
import { NotFoundError } from "domain/errors/NotFoundError"
import { MatchStage } from "../../domain/enum/MatchStage"
import { MatchStatus } from "../../domain/enum/MatchStatus"

export class MatchService {
    private readonly matchRepository: Repository<Match>

    constructor(matchRepository: Repository<Match>) {
        this.matchRepository = matchRepository
    }

    async findAll(): Promise<Match[]> {
        return await this.matchRepository.find({
            relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
        })
    }

    async findById(id: number): Promise<Match> {
        const match = await this.matchRepository.findOne({
            where: { id },
            relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
        })
        if (!match) {
            throw new NotFoundError(`Match ${id} does not exist`)
        }
        return match
    }

    async findByTeamCode(code: string): Promise<Match[]> {
        const matchs = await this.findAll()
        return matchs.filter(m =>
            m.homeTeam.code.value === code ||
            m.awayTeam.code.value === code
        )
    }

    async findByStage(stage: string): Promise<Match[]> {
        if (!Object.values(MatchStage).includes(stage as MatchStage)) {
            throw new NotFoundError(`Stage "${stage}" does not exist`)
        }
        const matchs = await this.findAll()
        return matchs.filter(m => m.stage === stage)
    }
}