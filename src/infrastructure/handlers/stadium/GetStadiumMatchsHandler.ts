import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Stadium } from "domain/entities/Stadium";
import { Match } from "domain/entities/Match";
import { ILike } from "typeorm";

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const stadium = await stadiumRepository.findOne({
      where: { name: ILike(name) },
      relations: ["city", "city.country"]
    });

    if (!stadium) {
      throw new HTTPException(404, { message: `Stadium "${name}" does not exist` });
    }

    const matchRepository = AppDataSource.getRepository(Match);
    const stadiumMatchs = await matchRepository
      .createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country")
      .where("LOWER(stadium.name) = LOWER(:name)", { name })
      .getMany();

    return c.json({
      success: true,
      message: `Matchs at ${stadium.name}`,
      data: stadiumMatchs
    }, 200);
  }
}