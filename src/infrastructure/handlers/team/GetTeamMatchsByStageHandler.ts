import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { Team } from "../../../domain/entities/Team"
import { MatchService } from "../../../application/services/MatchService"
import { TeamService } from "../../../application/services/TeamService"
import { ValidationError } from "../../../domain/errors/ValidationError"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

const VALID_STAGES = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_finals",
  "semi_finals",
  "third_place",
  "final"
]

export class GetTeamMatchsByStageHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase()
    const stage = String(c.req.param("stage"))
    const matchRepository = AppDataSource.getRepository(Match)
    const teamRepository = AppDataSource.getRepository(Team)
    const matchService = new MatchService(matchRepository)
    const teamService = new TeamService(teamRepository)

    try {
      if (!/^[A-Z]{3}$/.test(fifaCode)) {
        throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`)
      }

      if (!VALID_STAGES.includes(stage)) {
        throw new ValidationError(`Invalid stage: "${stage}"`)
      }

      const team = await teamService.findByFifaCode(fifaCode)

      const allMatchs = await matchService.findByTeamCode(fifaCode)
      const filteredMatchs = allMatchs.filter(m => m.stage === stage)

      return c.json({
        success: true,
        message: `Matchs for team ${fifaCode} at stage ${stage}`,
        data: filteredMatchs
      }, 200)

    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}