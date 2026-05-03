import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Country } from "../../../domain/entities/Country"
import { City } from "../../../domain/entities/City"
import { CountryService } from "../../../application/services/CountryService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = String(c.req.param("code")).toLowerCase()
    const countryRepository = AppDataSource.getRepository(Country)
    const countryService = new CountryService(countryRepository)

    try {
      const country = await countryService.findByCode(code)

      const cityRepository = AppDataSource.getRepository(City)
      const countryCities = await cityRepository
        .createQueryBuilder("city")
        .leftJoinAndSelect("city.country", "country")
        .where("LOWER(country.code) = LOWER(:code)", { code })
        .getMany()

      return c.json({
        success: true,
        message: `Cities in ${country.name}`,
        data: countryCities
      }, 200)

    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}