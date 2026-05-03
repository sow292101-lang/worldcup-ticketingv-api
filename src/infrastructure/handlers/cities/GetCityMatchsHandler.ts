import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { City } from "domain/entities/City";
import { Match } from "domain/entities/Match";
import { ILike } from "typeorm";

export class GetCityMatchsHandler {
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

    const matchRepository = AppDataSource.getRepository(Match);
    const cityMatchs = await matchRepository
      .createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country")
      .where("LOWER(city.name) = LOWER(:name)", { name })
      .getMany();

    return c.json({
      success: true,
      message: `Matchs in ${city.name}`,
      data: cityMatchs
    }, 200);
  }
}