import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Stadium } from "../../../domain/entities/Stadium"
import { StadiumService } from "../../../application/services/StadiumService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"))
    const stadiumRepository = AppDataSource.getRepository(Stadium)
    const stadiumService = new StadiumService(stadiumRepository)

    try {
      const stadium = await stadiumService.findByName(name)
      return c.json({
        success: true,
        message: `Stadium ${stadium.name}`,
        data: stadium
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}