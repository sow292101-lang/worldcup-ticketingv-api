import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { MatchService } from "../../../application/services/MatchService"
import { ValidationError } from "../../../domain/errors/ValidationError"

const VALID_STAGES = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_finals",
  "semi_finals",
  "third_place",
  "final"
]

export class GetMatchsByStageHandler {
  async handle(c: Context) {
    const stage = String(c.req.param("stage"))
    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    try {
      if (!VALID_STAGES.includes(stage)) {
        throw new ValidationError(`Invalid stage: "${stage}"`)
      }

      const matchs = await matchService.findAll()
      const filteredMatchs = matchs.filter(m => m.stage === stage)

      return c.json({
        success: true,
        message: `Matchs at stage ${stage}`,
        data: filteredMatchs
      }, 200)

    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }
      throw e
    }
  }
}