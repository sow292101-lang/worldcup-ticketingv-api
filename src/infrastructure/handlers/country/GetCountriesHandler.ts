import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Country } from "../../../domain/entities/Country"
import { CountryService } from "../../../application/services/CountryService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")
    const countryRepository = AppDataSource.getRepository(Country)
    const countryService = new CountryService(countryRepository)

    try {
      const countries = await countryService.findAll()

      if (name) {
        const result = countries.filter(c =>
          c.name.toLowerCase().includes(name.toLowerCase())
        )
        return c.json({
          success: true,
          message: `Countries filtered by name: ${name}`,
          data: result
        }, 200)
      }

      return c.json({
        success: true,
        message: "All countries",
        data: countries
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}