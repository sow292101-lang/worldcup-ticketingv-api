import { Context } from "hono"
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { Match } from "domain/entities/Match"

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = Number(c.req.param("id"))
    
    const matchRepository = AppDataSource.getRepository(Match)
    const match = await matchRepository.findOne({
      where: { id },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    })

    if (!match) {
      throw new HTTPException(404, { message: "Match " + id + " does not exist" })
    }

    return c.json({
      success: true,
      message: "Match " + id,
      data: match
    })
  }
}