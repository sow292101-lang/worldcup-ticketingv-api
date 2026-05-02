import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "infrastructure/mock/matchs";
import { stadiums } from "infrastructure/mock/stadiums";

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const name = String(c.req.param("name"));

    
    const stadium = stadiums.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );

   
    if (!stadium) {
      throw new HTTPException(404, { message: `Stadium "${name}" does not exist` });
    }

   
    const stadiumMatchs = matchs.filter(
      (match) => match.stadium.name.toLowerCase() === name.toLowerCase()
    );

    return c.json({

      success: true,
      message: `Matchs at ${stadium.name}`,
      data: stadiumMatchs
    }, 200);
  }
}