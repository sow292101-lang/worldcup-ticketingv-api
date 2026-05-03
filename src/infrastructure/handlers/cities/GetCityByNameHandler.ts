import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { City } from "domain/entities/City";
import { ILike } from "typeorm";

export class GetCityByNameHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

    const cityRepository = AppDataSource.getRepository(City);
    const city = await cityRepository.findOne({
      where: { name: ILike(name) },
      relations: ["country"]
    });

    if (!city) {
      throw new HTTPException(404, { message: `City "${name}" does not exist` });
    }

    return c.json({
      success: true,
      message: `City ${city.name}`,
      data: city
    }, 200);
  }
}