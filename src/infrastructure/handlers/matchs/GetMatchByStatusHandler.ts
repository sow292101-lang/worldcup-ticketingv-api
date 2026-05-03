import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { MatchService } from "../../../application/services/MatchService"
import { ValidationError } from "../../../domain/errors/ValidationError"

const VALID_STATUS = [
  "scheduled",
  "live", 
  "finished",
  "cancelled"
]

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = String(c.req.param("status"))
    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    try {
      if (!VALID_STATUS.includes(status)) {
        throw new ValidationError(`Invalid status: "${status}"`)
      }

      const matchs = await matchService.findAll()
      const filteredMatchs = matchs.filter(m => m.status === status)

      return c.json({
        success: true,
        message: `Matchs with status ${status}`,
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