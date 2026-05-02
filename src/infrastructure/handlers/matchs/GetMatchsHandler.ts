import { Context } from "hono"
import { matchs } from "../../mock/matchs"
import { MatchStage } from "domain/enum/MatchStage"
import { HTTPException } from "hono/http-exception"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")
    const date = c.req.query("date")
    let result = [...matchs]
    if(stage){
         if (!Object.values(MatchStage).includes(stage as MatchStage)) {
        throw new HTTPException(400, { message: `Invalid stage: "${stage}"` })
      }
      result = result.filter(m=>m.stage === stage)
      return c.json({
        success: true,
        message: `Matchs filtered by stage: ${stage}`,
        data: result
      }, 200)
    }

    if (teamCode) {
      if (!/^[A-Z]{3}$/.test(teamCode.toUpperCase())) {
        return c.json({
          success: false,
          error: `Invalid FIFA code: "${teamCode}"`
        }, 400)
      }

      result = result.filter(m =>
         m.homeTeam.code.value === teamCode.toUpperCase() ||
    m.awayTeam.code.value === teamCode.toUpperCase()
      )

      return c.json({
        success: true,
        message: `Matchs filtered by team[code]: ${teamCode.toUpperCase()}`,
        data: result
      }, 200)
    }
      if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return c.json({
          success: false,
          error: `Invalid date format: "${date}"`
        }, 400)
      }

      
      result = result.filter(m =>
        m.date.toISOString().split("T")[0] === date
      )

      return c.json({
        success: true,
        message: `Matchs filtered by date: ${date}`,
        data: result
      }, 200)
    }


    return c.json({
      success: true,
      message: "All matchs",
      data: result
    }, 200)
  }
}