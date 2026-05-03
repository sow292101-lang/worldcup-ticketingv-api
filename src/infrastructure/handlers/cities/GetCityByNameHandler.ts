import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { City } from "../../../domain/entities/City"
import { CityService } from "../../../application/services/CityService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetCityByNameHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"))
    const cityRepository = AppDataSource.getRepository(City)
    const cityService = new CityService(cityRepository)

    try {
      const city = await cityService.findByName(name)
      return c.json({
        success: true,
        message: `City ${city.name}`,
        data: city
      }, 200)
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}