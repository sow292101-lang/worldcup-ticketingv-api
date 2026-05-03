import { Repository } from "typeorm"
import { Team } from "../../domain/entities/Team"
import { NotFoundError } from "domain/errors/NotFoundError"

export class TeamService {
    private readonly teamRepository: Repository<Team>

    constructor(teamRepository: Repository<Team>) {
        this.teamRepository = teamRepository
    }

    async findAll(): Promise<Team[]> {
        return await this.teamRepository.find({
            relations: ["country"]
        })
    }

  async findByFifaCode(code: string): Promise<Team> {
    const teams = await this.teamRepository.find({
        relations: ["country"]
    })
    
    const team = teams.find(t => t.code.value === code)
    
    if (!team) {
        throw new NotFoundError(`Team "${code}" does not exist`)
    }
    return team
}
}