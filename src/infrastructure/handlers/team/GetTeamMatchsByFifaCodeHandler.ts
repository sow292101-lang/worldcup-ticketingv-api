import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { Match } from "domain/entities/Match"

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase()

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` })
    }

    const matchRepository = AppDataSource.getRepository(Match)
    const result = await matchRepository
      .createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country")
      .where("homeTeam.code = :code", { code: fifaCode })
      .orWhere("awayTeam.code = :code", { code: fifaCode })
      .getMany()

    return c.json({
      success: true,
      message: `Matchs for team ${fifaCode}`,
      data: result
    }, 200)
  }
}