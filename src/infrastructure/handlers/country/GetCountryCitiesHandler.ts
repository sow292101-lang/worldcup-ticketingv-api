import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Country } from "domain/entities/Country";
import { City } from "domain/entities/City";
import { ILike } from "typeorm";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = String(c.req.param("code")).toLowerCase();

    const countryRepository = AppDataSource.getRepository(Country);
    const country = await countryRepository.findOne({
      where: { code: ILike(code) }
    });

    if (!country) {
      throw new HTTPException(404, { message: `Country "${code}" does not exist` });
    }

    const cityRepository = AppDataSource.getRepository(City);
    const countryCities = await cityRepository
      .createQueryBuilder("city")
      .leftJoinAndSelect("city.country", "country")
      .where("LOWER(country.code) = LOWER(:code)", { code })
      .getMany();

    return c.json({
      success: true,
      message: `Cities in ${country.name}`,
      data: countryCities
    }, 200);
  }
}