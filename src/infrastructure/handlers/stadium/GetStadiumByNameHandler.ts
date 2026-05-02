import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { stadiums } from "infrastructure/mock/stadiums";

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

    
    const stadium = stadiums.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );

  
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