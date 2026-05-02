import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { matchs } from "../../mock/matchs"
import { teams } from "../../mock/teams"
export class GetTeamMatchsByFifaCodeHandler {
    async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase()

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` })
    }

    const result = matchs.filter(m =>
      m.homeTeam.code.value === fifaCode ||
      m.awayTeam.code.value === fifaCode
    )

    return c.json({
      success: true,
      message: `Matchs for team ${fifaCode}`, 
      data: result
    }, 200)
  }
}