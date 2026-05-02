import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { cities } from "infrastructure/mock/cities";

export class GetCityByNameHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

   
    const city = cities.find(
      (ci) => ci.name.toLowerCase() === name.toLowerCase()
    );

    
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