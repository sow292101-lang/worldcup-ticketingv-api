import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "infrastructure/mock/matchs";
import { teams } from "infrastructure/mock/teams";

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

  
    const team = teams.find(t => t.code.value === fifaCode);
    if (!team) {
      throw new HTTPException(404, { message: "Team " + fifaCode + " does not exist" });
    }

  
    const filteredMatchs = matchs.filter(
      (match) =>
        (match.homeTeam.code.value === fifaCode ||
        match.awayTeam.code.value === fifaCode) &&
        match.stage === stage
    );

    return c.json({
      success: true,
      data: filteredMatchs
    }, 200);
  }
}