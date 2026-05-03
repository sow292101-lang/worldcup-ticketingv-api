import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Match } from "../../../domain/entities/Match"
import { MatchService } from "../../../application/services/MatchService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetMatchByIdHandler {
  async handle(c: Context) {
    const id = Number(c.req.param("id"))
    const matchRepository = AppDataSource.getRepository(Match)
    const matchService = new MatchService(matchRepository)

    try {
      const match = await matchService.findById(id)
      return c.json({
        success: true,
        message: "Match " + id,
        data: match
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}