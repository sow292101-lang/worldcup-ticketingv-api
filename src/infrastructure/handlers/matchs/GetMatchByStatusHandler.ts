import { Context } from "hono";
import { AppDataSource } from "infrastructure/database/AppDataSource";
import { Match } from "domain/entities/Match"; 
import { MatchStatus } from "domain/enum/MatchStatus";

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

    const matchRepository = AppDataSource.getRepository(Match); 
    const filteredMatchs = await matchRepository.find({ 
      where: { status: status as MatchStatus },
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"] 
    });

    return c.json({
      success: true,
      message: `Matchs with status ${status}`,
      data: filteredMatchs
    }, 200);
  }
}