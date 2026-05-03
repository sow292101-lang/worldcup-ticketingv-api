import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { City } from "../../../domain/entities/City"
import { CityService } from "../../../application/services/CityService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetCitiesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")
    const cityRepository = AppDataSource.getRepository(City)
    const cityService = new CityService(cityRepository)

    try {
      if (name) {
        const city = await cityService.findByName(name)
        return c.json({
          success: true,
          message: `Cities filtered by name: ${name}`,
          data: [city]
        }, 200)
      }

      const cities = await cityService.findAll()
      return c.json({
        success: true,
        message: "All cities",
        data: cities
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}