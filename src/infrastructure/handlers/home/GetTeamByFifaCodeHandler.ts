import { Context } from "hono";
import { teams } from "infrastructure/mock/teams";

export class GetTeamByFifaCodeHandler {
  handle(c: Context) {
    const fifaCode = c.req.param("fifaCode");
    const team = teams.find(t => t.fifaCode === fifaCode);
    if (!team) {
      return c.json({
        success: true,
        error: "Team " + fifaCode + " does not exist"
      }, 200);
    }

    return c.json({
      success: true,
      message: "Team " + fifaCode,
      data: team
    }, 200);
  }
}
