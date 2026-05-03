import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Team } from "domain/entities/Team";

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode"));

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      return c.json({
        success: false,
        error: `Invalid FIFA code: "${fifaCode}"`
      }, 400)
    }

    const teamRepository = AppDataSource.getRepository(Team);
    const team = await teamRepository
      .createQueryBuilder("team")
      .where("team.code = :code", { code: fifaCode })
      .getOne();

    if (!team) {
      throw new HTTPException(404, { message: "Team " + fifaCode + " does not exist" })
    }

    return c.json({
      success: true,
      message: "Team " + fifaCode,
      data: team
    }, 200);
  }
}