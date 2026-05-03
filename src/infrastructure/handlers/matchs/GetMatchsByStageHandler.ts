import { Context } from "hono";
import { AppDataSource } from "infrastructure/database/AppDataSource"; 
import { Match } from "domain/entities/Match";
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

export class GetMatchsByStageHandler {
  async handle(c: Context) {
    const stage = String(c.req.param("stage"));

    if (!VALID_STAGES.includes(stage)) {
      return c.json({
        success: false,
        error: `Invalid stage: "${stage}"`
      }, 400);
    }

    const matchRepository = AppDataSource.getRepository(Match);
    const filteredMatchs = await matchRepository.find({ 
      where: { stage: stage as MatchStage },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"] 
    });

    return c.json({
      success: true,
      message: `Matchs at stage ${stage}`,
      data: filteredMatchs
    }, 200);
  }
}