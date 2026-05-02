import { Context } from "hono";
import { matchs } from "infrastructure/mock/matchs";

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

   
    const filteredMatchs = matchs.filter(
      (match) => match.stage === stage
    );

    return c.json({
      success: true,
      message: `Matchs at stage ${stage}`,
      data: filteredMatchs
    }, 200);
  }
}