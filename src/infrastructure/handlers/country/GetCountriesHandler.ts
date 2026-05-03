import { Context } from "hono"
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { Country } from "domain/entities/Country"
import { ILike } from "typeorm"

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const countryRepository = AppDataSource.getRepository(Country)

    if (name) {
      const result = await countryRepository.find({
        where: { name: ILike(`%${name}%`) }
      })
      return c.json({
        success: true,
        message: `Countries filtered by name: ${name}`,
        data: result
      }, 200)
    }

    const result = await countryRepository.find()
    return c.json({
      success: true,
      message: "All countries",
      data: result
    }, 200)
  }
}