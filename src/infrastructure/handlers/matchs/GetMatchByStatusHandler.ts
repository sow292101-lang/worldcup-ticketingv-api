import { Context } from "hono";
import { matchs } from "infrastructure/mock/matchs";

const VALID_STATUS = [
  "scheduled",
  "live",
  "finished",
  "cancelled"
];

export class GetMatchsByStatusHandler {
  async handle(c: Context) {
    const status = String(c.req.param("status"));

   
    if (!VALID_STATUS.includes(status)) {
      return c.json({
        success: false,
        error: `Invalid status: "${status}"`
      }, 400);
    }

    
    const filteredMatchs = matchs.filter(
      (match) => match.status === status
    );

    return c.json({
      success: true,
      message: `Matchs with status ${status}`,
      data: filteredMatchs
    }, 200);
  }
}