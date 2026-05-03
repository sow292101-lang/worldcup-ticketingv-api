import { Context } from "hono"
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { Stadium } from "domain/entities/Stadium"
import { ILike } from "typeorm"

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    const stadiumRepository = AppDataSource.getRepository(Stadium)

    if (name) {
      const result = await stadiumRepository.find({
        where: { name: ILike(`%${name}%`) },
        relations: ["city", "city.country"]
      })
      return c.json({
        success: true,
        message: `Stadiums filtered by name: ${name}`,
        data: result
      }, 200)
    }

    const result = await stadiumRepository.find({
      relations: ["city", "city.country"]
    })
    return c.json({
      success: true,
      message: "All stadiums",
      data: result
    }, 200)
  }
}