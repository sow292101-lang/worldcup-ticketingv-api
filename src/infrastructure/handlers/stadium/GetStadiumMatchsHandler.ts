import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Stadium } from "../../../domain/entities/Stadium"
import { Match } from "../../../domain/entities/Match"
import { StadiumService } from "../../../application/services/StadiumService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"))
    const stadiumRepository = AppDataSource.getRepository(Stadium)
    const stadiumService = new StadiumService(stadiumRepository)

    try {
      const stadium = await stadiumService.findByName(name)

      const matchRepository = AppDataSource.getRepository(Match)
      const stadiumMatchs = await matchRepository
        .createQueryBuilder("match")
        .leftJoinAndSelect("match.homeTeam", "homeTeam")
        .leftJoinAndSelect("match.awayTeam", "awayTeam")
        .leftJoinAndSelect("match.stadium", "stadium")
        .leftJoinAndSelect("stadium.city", "city")
        .leftJoinAndSelect("city.country", "country")
        .where("LOWER(stadium.name) = LOWER(:name)", { name })
        .getMany()

      return c.json({
        success: true,
        message: `Matchs at ${stadium.name}`,
        data: stadiumMatchs
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}