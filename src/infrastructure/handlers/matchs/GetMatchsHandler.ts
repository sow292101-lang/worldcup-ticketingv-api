import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { MatchService } from "../../../application/services/MatchService"
import { ValidationError } from "../../../domain/errors/ValidationError"
import { MatchStage } from "../../../domain/enum/MatchStage"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")
    const date = c.req.query("date")

    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    try {
      if (stage) {
        if (!Object.values(MatchStage).includes(stage as MatchStage)) {
          throw new ValidationError(`Invalid stage: "${stage}"`)
        }
        const result = await matchService.findByStage(stage)
        return c.json({
          success: true,
          message: `Matchs filtered by stage: ${stage}`,
          data: result
        }, 200)
      }

      if (teamCode) {
        if (!/^[A-Z]{3}$/.test(teamCode.toUpperCase())) {
          throw new ValidationError(`Invalid FIFA code: "${teamCode}"`)
        }
        const result = await matchService.findByTeamCode(teamCode.toUpperCase())
        return c.json({
          success: true,
          message: `Matchs filtered by team[code]: ${teamCode.toUpperCase()}`,
          data: result
        }, 200)
      }

      if (date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          throw new ValidationError(`Invalid date format: "${date}"`)
        }
        const allMatchs = await matchService.findAll()
        const result = allMatchs.filter(m =>
          m.date.toISOString().split("T")[0] === date
        )
        return c.json({
          success: true,
          message: `Matchs filtered by date: ${date}`,
          data: result
        }, 200)
      }

      const result = await matchService.findAll()
      return c.json({
        success: true,
        message: "All matchs",
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