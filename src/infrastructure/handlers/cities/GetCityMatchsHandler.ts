import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "infrastructure/mock/matchs";
import { cities } from "infrastructure/mock/cities";

export class GetCityMatchsHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

    
    const city = cities.find(
      (ci) => ci.name.toLowerCase() === name.toLowerCase()
    );

    
    if (!city) {
      throw new HTTPException(404, { message: `City "${name}" does not exist` });
    }

   
    const cityMatchs = matchs.filter(
      (match) => match.stadium.city.name.toLowerCase() === name.toLowerCase()
    );

    return c.json({
      success: true,
      message: `Matchs in ${city.name}`,
      data: cityMatchs
    }, 200);
  }
}