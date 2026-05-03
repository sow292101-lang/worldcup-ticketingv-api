import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Match } from "domain/entities/Match";
import { Team } from "domain/entities/Team";
import { MatchStage } from "domain/enum/MatchStage";

const VALID_STAGES = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_finals",
  "semi_finals",
  "third_place",
  "final"
];

export class GetTeamMatchsByStageHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase();
    const stage = String(c.req.param("stage"));

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      return c.json({
        success: false,
        error: `Invalid FIFA code: "${fifaCode}"`
      }, 400);
    }

    if (!VALID_STAGES.includes(stage)) {
      return c.json({
        success: false,
        error: `Invalid stage: "${stage}"`
      }, 400);
    }

    const teamRepository = AppDataSource.getRepository(Team);
    const team = await teamRepository
      .createQueryBuilder("team")
      .where("team.code = :code", { code: fifaCode })
      .getOne();

    if (!team) {
      throw new HTTPException(404, { message: "Team " + fifaCode + " does not exist" });
    }

    const matchRepository = AppDataSource.getRepository(Match);
    const filteredMatchs = await matchRepository
      .createQueryBuilder("match")
      .leftJoinAndSelect("match.homeTeam", "homeTeam")
      .leftJoinAndSelect("match.awayTeam", "awayTeam")
      .leftJoinAndSelect("match.stadium", "stadium")
      .leftJoinAndSelect("stadium.city", "city")
      .leftJoinAndSelect("city.country", "country")
      .where("homeTeam.code = :code", { code: fifaCode })
      .orWhere("awayTeam.code = :code", { code: fifaCode })
      .andWhere("match.stage = :stage", { stage })
      .getMany();

    return c.json({
      success: true,
      data: filteredMatchs
    }, 200);
  }
}