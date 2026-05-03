import { Context } from "hono"
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { City } from "domain/entities/City"
import { ILike } from "typeorm"

export class GetCitiesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const cityRepository = AppDataSource.getRepository(City)

    if (name) {
      const result = await cityRepository.find({
        where: { name: ILike(`%${name}%`) },
        relations: ["country"]
      })
      return c.json({
        success: true,
        message: `Cities filtered by name: ${name}`,
        data: result
      }, 200)
    }

    const result = await cityRepository.find({
      relations: ["country"]
    })
    return c.json({
      success: true,
      message: "All cities",
      data: result
    }, 200)
  }
}