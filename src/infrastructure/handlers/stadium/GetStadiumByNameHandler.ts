import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Stadium } from "domain/entities/Stadium";
import { ILike } from "typeorm";

export class GetStadiumByNameHandler {
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

    return c.json({
      success: true,
      message: `Stadium ${stadium.name}`,
      data: stadium
    }, 200);
  }
}