import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Stadium } from "../../../domain/entities/Stadium"
import { StadiumService } from "../../../application/services/StadiumService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")
    const stadiumRepository = AppDataSource.getRepository(Stadium)
    const stadiumService = new StadiumService(stadiumRepository)

    try {
      const stadiums = await stadiumService.findAll()

      if (name) {
        const result = stadiums.filter(s =>
          s.name.toLowerCase().includes(name.toLowerCase())
        )
        return c.json({
          success: true,
          message: `Stadiums filtered by name: ${name}`,
          data: result
        }, 200)
      }

      return c.json({
        success: true,
        message: "All stadiums",
        data: stadiums
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}