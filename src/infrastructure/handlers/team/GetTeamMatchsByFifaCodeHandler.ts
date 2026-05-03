import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { MatchService } from "../../../application/services/MatchService"
import { ValidationError } from "../../../domain/errors/ValidationError"

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase()
    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    try {
      if (!/^[A-Z]{3}$/.test(fifaCode)) {
        throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`)
      }

      const result = await matchService.findByTeamCode(fifaCode)
      return c.json({
        success: true,
        message: `Matchs for team ${fifaCode}`,
        data: result
      }, 200)

    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }
      throw e
    }
  }
}