import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { countries } from "infrastructure/mock/contries";
import { cities } from "infrastructure/mock/cities";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = String(c.req.param("code")).toLowerCase();

    
    const country = countries.find(
      (co) => co.code.toLowerCase() === code
    );

    if (!country) {
      throw new HTTPException(404, { message: `Country "${code}" does not exist` });
    }


    const countryCities = cities.filter(
      (city) => city.country.code.toLowerCase() === code
    );

    return c.json({
      success: true,
      message: `Cities in ${country.name}`,
      data: countryCities
    }, 200);
  }
}